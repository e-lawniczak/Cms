﻿using Microsoft.AspNetCore.Mvc;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Dto.Picture;
using PizzeriaAPI.ORM;
using PizzeriaAPI.Repositories;
using Swashbuckle.Swagger.Annotations;
using System.Drawing;
using System.Net;


namespace PizzeriaAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PictureController : ControllerBase
    {
        private readonly int MAX_IMAGE_HEIGHT = 250;
        private readonly int MAX_IMAGE_WIDTH = 250;
        private readonly string currentDirectory;
        private readonly string originalImageDirectory;
        private readonly string resizedImageDirectory;
        private readonly ILogger<PictureController> logger;
        private readonly ITransactionCoordinator transactionCoordinator;
        private readonly IPictureRepository pictureRepository;

        public PictureController(ILogger<PictureController> logger,
            ITransactionCoordinator transactionCoordinator,
            IPictureRepository pictureRepository)
        {
            this.logger = logger;
            this.transactionCoordinator = transactionCoordinator;
            this.pictureRepository = pictureRepository;
            currentDirectory = AppContext.BaseDirectory;
            originalImageDirectory = currentDirectory + "Images/Original/";
            resizedImageDirectory = currentDirectory + "Images/Resized/";
        }

        [HttpPost]
        [Route("/AddPicture")]
        [SwaggerResponse(HttpStatusCode.OK, "Picture inserted successfully")]
        [SwaggerResponse(HttpStatusCode.InternalServerError, "Failed to save file to filesystem")]
        public async Task<ActionResult> AddPicture([FromForm] AddPictureDto pictureDto)
        {
            try
            {
                var imageBytes = ConvertIFormFileToByteArray(pictureDto.Picture);
                var resizedImage = ResizeImage(imageBytes, MAX_IMAGE_WIDTH, MAX_IMAGE_HEIGHT);
                await SavePictureToLocalFileSystem(pictureDto.Name, pictureDto.Picture, resizedImage);
            }
            catch (Exception e)
            {
                logger.LogError($"Failed to save picture to filesystem: {e.Message}", e);
                return Problem($"Failed to save picture to filesystem: {e.Message}");
            }
            var picture = GetPicture(pictureDto);
            try
            {
                await transactionCoordinator.InCommitScopeAsync(async session =>
                {
                    await pictureRepository.InsertAsync(picture, session);
                });
            }
            catch (Exception e)
            {
                DeletePictureFromFilesystem(picture);
                logger.LogError($"Failed to save picture to database: {e.Message}", e);
                return Problem($"Failed to save picture to database: {e.Message}");
            }

            return Ok("Picture inserted successfully");
        }

        private void DeletePictureFromFilesystem(Picture picture)
        {
            try
            {
                System.IO.File.Delete(picture.FilePath);
            }
            catch (Exception e)
            {
                logger.LogError($"Failed to delete original picture from filesystem: {e.Message}", e);
            }
            try
            {
                System.IO.File.Delete(picture.ResizedFilePath);
            }
            catch (Exception e)
            {
                logger.LogError($"Failed to delete resized picture from filesystem: {e.Message}", e);
            }
        }

        [HttpGet]
        [Route("/GetPicture/Full/{pictureId}")]
        [SwaggerResponse(HttpStatusCode.OK, "Picture got successfully", typeof(byte[]))]
        [SwaggerResponse(HttpStatusCode.InternalServerError, "Failed to get picture from filesystem")]
        [SwaggerResponse(HttpStatusCode.BadRequest, "Picture not found")]
        public async Task<ActionResult> GetPictureFull([FromRoute] int pictureId)
        {
            var picture = await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                return await pictureRepository.GetByIdAsync(pictureId, session);
            });
            if (picture == null)
            {
                return BadRequest("Picture not found");
            }

            try
            {
                byte[] binaryImage = System.IO.File.ReadAllBytes(picture.FilePath);
                return File(binaryImage, GetPictureExtension(picture.Name));
            }
            catch (Exception e)
            {
                logger.LogError($"Failed to get picture from filesystem: {e.Message}", e);
                return Problem($"Failed to get picture from filesystem: {e.Message}");
            }
        }

        [HttpGet]
        [Route("/GetPicture/Mini/{pictureId}")]
        [SwaggerResponse(HttpStatusCode.OK, "Picture got successfully", typeof(byte[]))]
        [SwaggerResponse(HttpStatusCode.InternalServerError, "Failed to get picture from filesystem")]
        [SwaggerResponse(HttpStatusCode.BadRequest, "Picture not found")]
        public async Task<ActionResult> GetPictureMini([FromRoute] int pictureId)
        {
            var picture = await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                return await pictureRepository.GetByIdAsync(pictureId, session);
            });
            if (picture == null)
                return BadRequest("Picture not found");

            try
            {
                byte[] binaryImage = System.IO.File.ReadAllBytes(picture.ResizedFilePath);
                return File(binaryImage, GetPictureExtension(picture.Name));
            }
            catch (Exception e)
            {
                logger.LogError($"Failed to get picture from filesystem: {e.Message}", e);
                return Problem($"Failed to get picture from filesystem: {e.Message}");
            }
        }

        [HttpGet]
        [Route("/GetAllPictureList")]
        [SwaggerResponse(HttpStatusCode.OK, "Picture List")]
        [SwaggerResponse(HttpStatusCode.InternalServerError, "Failed to get pictures from database")]

        public async Task<ActionResult<IList<PictureDto>>> GetAllPictureList()
        {

            IList<PictureDto> pictureDtoList = new List<PictureDto>();

            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var pictureList = await pictureRepository.GetAllAsync(session);
                if (pictureList != null)
                    pictureDtoList = pictureList.Select(GetPictureDto).ToList();

            });

            return Ok(pictureDtoList);
        }

        [HttpPatch]
        [Route("/UpdatePicture")]
        [SwaggerResponse(HttpStatusCode.OK, "Picture updated successfully")]
        [SwaggerResponse(HttpStatusCode.BadRequest, "Picture not found")]
        [SwaggerResponse(HttpStatusCode.InternalServerError, "Failed to update picture")]
        public async Task<ActionResult> UpdatePicture([FromBody] UpdatePictureDto pictureDto)
        {
            var picture = await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                return await pictureRepository.GetByIdAsync(pictureDto.PictureId, session);
            });

            if (picture == null)
                return BadRequest("Picture not found");


            try
            {
                var imageBytes = ConvertIFormFileToByteArray(pictureDto.Picture);
                var resizedImage = ResizeImage(imageBytes, MAX_IMAGE_WIDTH, MAX_IMAGE_HEIGHT);
                await SavePictureToLocalFileSystem(pictureDto.Name, pictureDto.Picture, resizedImage);
            }
            catch (Exception e)
            {
                logger.LogError($"Failed to save picture to filesystem: {e.Message}", e);
                return Problem($"Failed to save picture to filesystem: {e.Message}");
            }

            var pictureFilePath = picture.FilePath.Clone().ToString();
            var pictureResizedFilePath = picture.ResizedFilePath.Clone().ToString();
            var tmpPictureFilePath = pictureFilePath + "tmp";
            var tmpPictureResizedFilePath = pictureResizedFilePath + "tmp";
            try
            {
                System.IO.File.Move(pictureFilePath, tmpPictureFilePath);
                System.IO.File.Move(pictureResizedFilePath, tmpPictureResizedFilePath);

                await UpdatePicture(picture, pictureDto);
                await transactionCoordinator.InCommitScopeAsync(async session =>
                {
                    await pictureRepository.UpdateAsync(picture, session);
                });

            }
            catch (Exception e)
            {
                System.IO.File.Move(tmpPictureFilePath, pictureFilePath);
                System.IO.File.Move(tmpPictureResizedFilePath, pictureResizedFilePath);

                logger.LogError($"Failed to update picture: {e.Message}", e);
                return Problem($"Failed to update picture: {e.Message}");
            }

            return Ok("Picture updated successfully");
        }

        private async Task UpdatePicture(Picture picture, UpdatePictureDto updatePictureDto)
        {
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                picture.ResizedFilePath = resizedImageDirectory + updatePictureDto.Name;
                picture.FilePath = originalImageDirectory + updatePictureDto.Name;
                picture.Name = updatePictureDto.Name;
                picture.Link = updatePictureDto.Link;
                picture.EntityWithPictureList = await pictureRepository.GetEntityWithPictureByIdsAsync(updatePictureDto.EntityWithPictureIdList ?? new List<int>(), session);
            });
        }

        [HttpDelete]
        [Route("/DeletePicture/{pictureId}")]
        [SwaggerResponse(HttpStatusCode.OK, "Picture was deleted successfully")]
        public async Task<ActionResult> DeletPicture([FromRoute] int pictureId)
        {
            var picture = await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                return await pictureRepository.GetByIdAsync(pictureId, session);
            });

            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await pictureRepository.DeleteAsync(pictureId, session);
                DeletePictureFromFilesystem(picture);
            });

            return Ok("Picture was deleted successfully");
        }

        private PictureDto GetPictureDto(Picture picture)
        {
            return new PictureDto()
            {
                PictureId = picture?.PictureId ?? 0,
                Name = picture?.Name ?? "",
                Link = picture?.Link ?? "",
                EntityWithPictureIdList = picture?.EntityWithPictureList?.Select(x => x.Id).ToList(),
            };
        }
        private Picture GetPicture(AddPictureDto addPictureDto)
        {
            return new Picture()
            {
                Name = addPictureDto.Name,
                Link = addPictureDto.Link,
                ResizedFilePath = resizedImageDirectory + addPictureDto.Name,
                FilePath = originalImageDirectory + addPictureDto.Name,
            };
        }
        private async Task SavePictureToLocalFileSystem(string pictureName, IFormFile picture, byte[]? resizedImage)
        {
            if (Directory.Exists(originalImageDirectory) == false)
            {
                Directory.CreateDirectory(originalImageDirectory);
            }
            if (Directory.Exists(resizedImageDirectory) == false)
            {
                Directory.CreateDirectory(resizedImageDirectory);
            }

            if (resizedImage != null)
            {
                using (var fileStream = new FileStream(resizedImageDirectory + pictureName, FileMode.Create, FileAccess.Write))
                {
                    fileStream.Write(resizedImage, 0, resizedImage.Length);
                }
            }
            if (picture != null)
            {
                using (var fileStream = new FileStream(originalImageDirectory + pictureName, FileMode.Create, FileAccess.Write))
                {
                    await picture.CopyToAsync(fileStream);
                }
            }
        }
        private byte[] ConvertIFormFileToByteArray(IFormFile file)
        {
            using (MemoryStream memoryStream = new MemoryStream())
            {
                file.CopyTo(memoryStream);
                return memoryStream.ToArray();
            }
        }

        private string GetPictureExtension(string fileName)
        {
            if (fileName.EndsWith("jpg"))
                return "Image/jpg";
            if (fileName.EndsWith("png"))
                return "Image/png";
            if (fileName.EndsWith("jpeg"))
                return "Image/jpeg";
            return "Image/jpg";
        }

        private byte[] ResizeImage(byte[] originalImageBytes, int maxWidth, int maxHeight)
        {
            using (MemoryStream originalStream = new MemoryStream(originalImageBytes))
            using (Image originalImage = Image.FromStream(originalStream))
            {
                int newWidth, newHeight;

                // Calculate new dimensions while maintaining aspect ratio
                if (originalImage.Width > originalImage.Height)
                {
                    newWidth = maxWidth;
                    newHeight = (int)((float)originalImage.Height / originalImage.Width * maxHeight);
                }
                else
                {
                    newWidth = (int)((float)originalImage.Width / originalImage.Height * maxWidth);
                    newHeight = maxHeight;
                }

                using (Bitmap resizedImage = new Bitmap(newWidth, newHeight))
                using (Graphics g = Graphics.FromImage(resizedImage))
                {
                    g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
                    g.DrawImage(originalImage, 0, 0, newWidth, newHeight);

                    using (MemoryStream resizedStream = new MemoryStream())
                    {
                        resizedImage.Save(resizedStream, originalImage.RawFormat);
                        return resizedStream.ToArray();
                    }
                }
            }
        }
    }
}