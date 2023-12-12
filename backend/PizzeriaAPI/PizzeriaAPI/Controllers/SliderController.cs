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
	public class SliderController : ControllerBase
	{

		private readonly ILogger<SliderController> logger;
		private readonly ITransactionCoordinator transactionCoordinator;
		private readonly ISliderRepository sliderRepository;
		private readonly IBannerRepository bannerRepository;

		public SliderController(ILogger<SliderController> logger,
			ITransactionCoordinator transactionCoordinator,
			ISliderRepository sliderRepository,
			IBannerRepository bannerRepository)
		{
			this.logger = logger;
			this.transactionCoordinator = transactionCoordinator;
			this.sliderRepository = sliderRepository;
			this.bannerRepository = bannerRepository;
		}

		[HttpPost]
		[Route("/AddSlider")]
		[SwaggerResponse(HttpStatusCode.OK, "Slider inserted successfully")]
		public async Task<ActionResult> AddSlider([FromBody] SliderDto sliderDto)
		{
			var slider = GetSlider(sliderDto);
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await sliderRepository.InsertOrUpdateAsync(slider, session);
			});

			return Ok("Slider inserted successfully");
		}


		[HttpGet]
		[Route("/GetAllSliderList")]
		[SwaggerResponse(HttpStatusCode.OK, "Slider List")]
		public async Task<ActionResult<IList<SliderDto>>> GetAllSliderList()
		{
			IList<SliderDto> sliderDtoList = null;
			await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
				var sliderList = await sliderRepository.GetAllAsync(session);
				sliderDtoList = sliderList.Select(GetSliderDto).ToList();
			});

			return Ok(sliderDtoList);
		}

		[HttpGet]
		[Route("/GetVisibleSliderList")]
		[SwaggerResponse(HttpStatusCode.OK, "Slider List")]
		public async Task<ActionResult<IList<SliderDto>>> GetVisibleSliderList()
		{
			IList<SliderDto> sliderDtoList = null;
			await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
				var sliderList = await sliderRepository.GetAllAsync(session);
				sliderDtoList = sliderList.Where(x => x.IsVisible).Select(GetSliderDto).ToList();
			});

			return Ok(sliderDtoList);
		}

		[HttpPatch]
		[Route("/UpdateSlider")]
		[SwaggerResponse(HttpStatusCode.OK, "Slider updated successfully")]
		public async Task<ActionResult> UpdateSlider([FromBody] SliderDto sliderDto)
		{
			var slider = GetSlider(sliderDto);
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await sliderRepository.InsertOrUpdateAsync(slider, session);
			});

			return Ok("Slider updated successfully");
		}
		[HttpDelete]
		[Route("/DeleteSlider/{sliderId}")]
		[SwaggerResponse(HttpStatusCode.OK, "Slider was deleted successfully")]
		public async Task<ActionResult> DeletSlider([FromRoute] int sliderId)
		{
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await sliderRepository.DeleteAsync(sliderId, session);
			});

			return Ok("Slider was deleted successfully");
		}

		private SliderDto GetSliderDto(Slider slider)
		{
			return new SliderDto()
			{
				SliderId = slider?.SliderId,
				Name = slider.Name,
				CreateDate = slider.CreateDate,
				ModificationDate = slider.ModificationDate,
				IsVisible = slider.IsVisible,
				BannerIdList = slider.BannerList.Select(x => x.Id).ToList(),
			};
		}
		private Slider GetSlider(SliderDto sliderDto)
		{
			return transactionCoordinator.InRollbackScope(session => {
				return new Slider()
				{

					SliderId = sliderDto?.SliderId ?? 0,
					Name = sliderDto.Name,
					CreateDate = sliderDto.CreateDate ?? DateTime.Now,
					ModificationDate = sliderDto.ModificationDate ?? DateTime.Now,
					IsVisible = sliderDto.IsVisible ?? true,
					BannerList = bannerRepository.GetBannerListByIdListAsync(sliderDto.BannerIdList ?? new List<int>(), session).Result,

				};
			});
		}
	}
}