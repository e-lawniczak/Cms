using Microsoft.AspNetCore.Mvc;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Dto.Picture;
using PizzeriaAPI.ORM;
using PizzeriaAPI.Repositories;
using Swashbuckle.Swagger.Annotations;
using System.Drawing;
using System.Net;
using System.IO;


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
		public async Task<ActionResult> AddPicture([FromForm] AddPictureDto pictureDto)
		{
			var imageBytes = ConvertIFormFileToByteArray(pictureDto.Picture);
            var resizedImage = ResizeImage(imageBytes, MAX_IMAGE_WIDTH, MAX_IMAGE_HEIGHT);
			await SavePictureToLocalFileSystem(pictureDto, resizedImage);
			var picture = GetPicture(pictureDto);
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await pictureRepository.InsertAsync(picture, session);
			});

			return Ok($"https://{HttpContext.Request.Host.Value}/GetPicture/{picture.PictureId}");
		}
		[HttpGet]
		[Route("/GetPicture/Full/{pictureId}")]
		[SwaggerResponse(HttpStatusCode.OK, "Picture got successfully", typeof(byte[]))]
		public async Task<ActionResult> GetPictureFull([FromRoute] int pictureId)
		{
			var picture = await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
				return await pictureRepository.GetByIdAsync(pictureId, session);
			});
			if(picture == null)
			{
				return NotFound();
			}
			byte[] binaryImage = System.IO.File.ReadAllBytes(picture.FilePath);
			return File(binaryImage, GetPictureExtension(picture.Name));
		}
		[HttpGet]
		[Route("/GetPicture/Mini/{pictureId}")]
		[SwaggerResponse(HttpStatusCode.OK, "Picture got successfully", typeof(byte[]))]
		public async Task<ActionResult> GetPictureMini([FromRoute] int pictureId)
		{
            var picture = await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
                return await pictureRepository.GetByIdAsync(pictureId, session);
            });
            if (picture == null)
			{
                return NotFound();
            }
			byte[] binaryImage = System.IO.File.ReadAllBytes(picture.ResizedFilePath);
            return File(binaryImage, GetPictureExtension(picture.Name));
        }

		[HttpGet]
		[Route("/GetAllPictureList")]
		[SwaggerResponse(HttpStatusCode.OK, "Picture List")]
		public async Task<ActionResult<IList<PictureDto>>> GetAllPictureList()
		{
			IList<PictureDto> pictureDtoList = null;
			await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
				var pictureList = await pictureRepository.GetAllAsync(session);
				pictureDtoList = pictureList.Select(GetPictureDto).ToList();
			});

			return Ok(pictureDtoList);
		}

		[HttpPatch]
		[Route("/UpdatePicture")]
		[SwaggerResponse(HttpStatusCode.OK, "Picture updated successfully")]
		public async Task<ActionResult> UpdatePicture([FromBody] PictureDto pictureDto)
		{
			var picture = await GetPicture(pictureDto);
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await pictureRepository.UpdateAsync(picture, session);
			});

			return Ok("Picture updated successfully");
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

			System.IO.File.Delete(picture.ResizedFilePath);
			System.IO.File.Delete(picture.FilePath);
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await pictureRepository.DeleteAsync(pictureId, session);
			});

			return Ok("Picture was deleted successfully");
		}

		private PictureDto GetPictureDto(Picture picture)
		{
			return new PictureDto()
			{
				PictureId = picture?.PictureId,
				Name = picture.Name,
				Link = picture.Link,
				FilePath = picture.FilePath,
				ResizedFilePath = picture.ResizedFilePath,
				EntityWithPictureIdList = picture.EntityWithPictureList.Select(x => x.Id).ToList(),
			};
		}
		private async Task<Picture> GetPicture(PictureDto pictureDto)
		{
			return await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
				return new Picture()
				{

					PictureId = pictureDto?.PictureId ?? 0,
					Name = pictureDto.Name,
					Link = pictureDto.Link,
					ResizedFilePath = pictureDto.ResizedFilePath,
					FilePath = pictureDto.FilePath,
					//EntityWithPictureList = await pictureRepository.GetPictureListByIdListAsync(pictureDto.EntityWithPictureIdList ?? new List<int>(), session),
				};
			});
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
		private async Task SavePictureToLocalFileSystem(AddPictureDto pictureDto, byte[]? resizedImage)
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
				using (var fileStream = new FileStream(resizedImageDirectory + pictureDto.Name, FileMode.Create, FileAccess.Write))
				{
					fileStream.Write(resizedImage, 0, resizedImage.Length);
				}
			}
			if (pictureDto.Picture != null)
			{
				using (var fileStream = new FileStream(originalImageDirectory + pictureDto.Name, FileMode.Create, FileAccess.Write))
				{
					await pictureDto.Picture.CopyToAsync(fileStream);
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
		private IFormFile ConvertBytesToFormFile(byte[] fileBytes, string fullFileName)
		{
			var stream = new MemoryStream(fileBytes);
			var formFile = new FormFile(stream, 0, stream.Length, null, fullFileName);
			return formFile;
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