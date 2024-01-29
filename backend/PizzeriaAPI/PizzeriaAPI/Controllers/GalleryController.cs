using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Dto.Gallery;
using PizzeriaAPI.ORM;
using PizzeriaAPI.Repositories.BaseEntityRepositories;
using PizzeriaAPI.Repositories.EntityWithPictureRepositories;
using Swashbuckle.Swagger.Annotations;
using System.Net;

namespace PizzeriaAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GalleryController : ControllerBase
    {

        private readonly ILogger<GalleryController> logger;
        private readonly ITransactionCoordinator transactionCoordinator;
        private readonly IGalleryRepository galleryRepository;
        private readonly IPictureRepository pictureRepository;

        public GalleryController(ILogger<GalleryController> logger,
            ITransactionCoordinator transactionCoordinator,
            IGalleryRepository galleryRepository,
            IPictureRepository pictureRepository)
        {
            this.logger = logger;
            this.transactionCoordinator = transactionCoordinator;
            this.galleryRepository = galleryRepository;
            this.pictureRepository = pictureRepository;
        }

        [HttpPost]
        [Route("/AddGallery")]
        [Authorize]
        [SwaggerResponse(HttpStatusCode.OK, "Gallery inserted successfully")]
        public async Task<ActionResult> AddGallery([FromBody] AddGalleryDto galleryDto)
        {
            var gallery = await GetGallery(galleryDto);
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await galleryRepository.InsertAsync(gallery, session);
            });

            return Ok("Gallery inserted successfully");
        }

        [HttpGet]
        [Route("/GetGallery/{galleryTitle}")]
        [SwaggerResponse(HttpStatusCode.OK, "Gallery got successfully", typeof(GalleryDto))]
        public async Task<ActionResult<GalleryDto>> GetGallery([FromRoute] string galleryTitle)
        {
            GalleryDto? galleryDto = null;
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var gallery = await galleryRepository.GetGalleryByNameAsync(galleryTitle, session);
                if (gallery != null)
                    galleryDto = GetGalleryDto(gallery);
            });

            return Ok(galleryDto);
        }

        [HttpGet]
        [Route("/GetAllGalleryList")]
        [SwaggerResponse(HttpStatusCode.OK, "Gallery List")]
        public async Task<ActionResult<IList<GalleryDto>>> GetAllGalleryList()
        {
            IList<GalleryDto> galleryDtoList = new List<GalleryDto>();
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var galleryList = await galleryRepository.GetAllAsync(session);
                if (galleryList != null)
                    galleryDtoList = galleryList.Select(GetGalleryDto).ToList();
            });

            return Ok(galleryDtoList);
        }

        [HttpGet]
        [Route("/GetVisibleGalleryList")]
        [SwaggerResponse(HttpStatusCode.OK, "Gallery List")]
        public async Task<ActionResult<IList<GalleryDto>>> GetVisibleGalleryList()
        {
            IList<GalleryDto> galleryDtoList = new List<GalleryDto>();
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var galleryList = await galleryRepository.GetVisibleAsync(session);
                if (galleryList != null)
                    galleryDtoList = galleryList.Select(GetGalleryDto).ToList();
            });

            return Ok(galleryDtoList);
        }

        [HttpPatch]
        [Route("/UpdateGallery")]
        [Authorize]
        [SwaggerResponse(HttpStatusCode.OK, "Gallery updated successfully")]
        [SwaggerResponse(HttpStatusCode.BadRequest, "Gallery not found")]
        public async Task<ActionResult> UpdateGallery([FromBody] GalleryDto galleryDto)
        {
            var gallery = await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                return await galleryRepository.GetByIdAsync(galleryDto.Id, session);
            });

            if (gallery == null)
                return BadRequest("Gallery not found");

            await UpdateGallery(gallery, galleryDto);
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await galleryRepository.UpdateAsync(gallery, session);
            });

            return Ok("Gallery updated successfully");
        }

        private async Task UpdateGallery(Gallery gallery, GalleryDto galleryDto)
        {
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                gallery.Name = galleryDto.Name;
                gallery.MainText = galleryDto.MainText;
                gallery.SubText = galleryDto.SubText;
                gallery.IsVisible = galleryDto.IsVisible;
                gallery.PictureList = await pictureRepository.GetPictureListByIdListAsync(galleryDto.PictureIdList ?? new List<int>(), session);
            });
        }

        [HttpDelete]
        [Route("/DeleteGallery/{galleryId}")]
        [Authorize]
        [SwaggerResponse(HttpStatusCode.OK, "Gallery was deleted successfully")]
        public async Task<ActionResult> DeletGallery([FromRoute] int galleryId)
        {
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await galleryRepository.DeleteAsync(galleryId, session);
            });

            return Ok("Gallery was deleted successfully");
        }

        private GalleryDto GetGalleryDto(Gallery gallery)
        {
            return new GalleryDto()
            {
                Id = gallery.Id,
                Name = gallery.Name,
                MainText = gallery.MainText,
                SubText = gallery.SubText,
                IsVisible = gallery.IsVisible,
                PictureIdList = gallery.PictureList?.Select(x => x.Id).ToList(),
            };
        }

        private async Task<Gallery> GetGallery(AddGalleryDto galleryDto)
        {
            return await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                return new Gallery()
                {
                    Name = galleryDto.Name,
                    MainText = galleryDto.MainText,
                    SubText = galleryDto.SubText,
                    IsVisible = galleryDto.IsVisible,
                    IsDeleted = false,
                    PictureList = await pictureRepository.GetPictureListByIdListAsync(galleryDto.PictureIdList ?? new List<int>(), session)
                };
            });
        }
    }
}