using Microsoft.IdentityModel.Tokens;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.ORM;
using PizzeriaAPI.Repositories;
using Swashbuckle.Swagger.Annotations;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using PizzeriaAPI.Dto;
using MySqlX.XDevAPI;

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
		[SwaggerResponse(HttpStatusCode.OK, "Gallery inserted successfully")]
		public async Task<ActionResult> AddGallery([FromBody] GalleryDto galleryDto)
		{
			var gallery = GetGallery(galleryDto);
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await galleryRepository.InsertAsync(gallery, session);
			});

			return Ok("Gallery inserted successfully");
		}


		[HttpGet]
		[Route("/GetAllGalleryList")]
		[SwaggerResponse(HttpStatusCode.OK, "Gallery List")]
		public async Task<ActionResult<IList<GalleryDto>>> GetAllGalleryList()
		{
			IList<GalleryDto> galleryDtoList = null;
			await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
				var galleryList = await galleryRepository.GetAllAsync(session);
				galleryDtoList = galleryList.Select(GetGalleryDto).ToList();
			});

			return Ok(galleryDtoList);
		}

		[HttpGet]
		[Route("/GetVisibleGalleryList")]
		[SwaggerResponse(HttpStatusCode.OK, "Gallery List")]
		public async Task<ActionResult<IList<GalleryDto>>> GetVisibleGalleryList()
		{
			IList<GalleryDto> galleryDtoList = null;
			await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
				var galleryList = await galleryRepository.GetAllAsync(session);
				galleryDtoList = galleryList.Where(x => x.IsVisible).Select(GetGalleryDto).ToList();
			});

			return Ok(galleryDtoList);
		}

		[HttpPatch]
		[Route("/UpdateGallery")]
		[SwaggerResponse(HttpStatusCode.OK, "Gallery updated successfully")]
		public async Task<ActionResult> UpdateGallery([FromBody] GalleryDto galleryDto)
		{
			var gallery = GetGallery(galleryDto);
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await galleryRepository.InsertAsync(gallery, session);
			});

			return Ok("Gallery updated successfully");
		}
		[HttpDelete]
		[Route("/DeleteGallery/{galleryId}")]
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
				Id = gallery?.Id ?? 0,
				Name = gallery.Name,
				MainText = gallery.MainText,
				SubText = gallery.SubText,
				IsVisible = gallery.IsVisible,
				PictureIdList = gallery.PictureList.Select(x => x.PictureId).ToList(),
			};
		}
		private Gallery GetGallery(GalleryDto galleryDto)
		{
			return transactionCoordinator.InRollbackScope(session => {
				return new Gallery()
				{

					Id = galleryDto?.Id ?? 0,
					Name = galleryDto.Name,
					MainText = galleryDto.MainText,
					SubText = galleryDto.SubText,
					IsVisible = galleryDto.IsVisible ?? true,
					IsDeleted = false,
					PictureList = pictureRepository.GetPictureListByIdListAsync(galleryDto.PictureIdList ?? new List<int>(), session).Result
				};
			});
		}
	}
}