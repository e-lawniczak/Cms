using Microsoft.AspNetCore.Mvc;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Dto;
using PizzeriaAPI.ORM;
using PizzeriaAPI.Repositories;
using Swashbuckle.Swagger.Annotations;
using System.Net;

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
			var slider = await GetSlider(sliderDto);
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await sliderRepository.InsertAsync(slider, session);
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
			var slider = await GetSlider(sliderDto);
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await sliderRepository.UpdateAsync(slider, session);
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
				IsVisible = slider.IsVisible,
				BannerIdList = slider.BannerList.Select(x => x.Id).ToList(),
			};
		}
		private async Task<Slider> GetSlider(SliderDto sliderDto)
		{
			return await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
				return new Slider()
				{

					SliderId = sliderDto?.SliderId ?? 0,
					Name = sliderDto.Name,
					IsVisible = sliderDto.IsVisible ?? true,
					BannerList = await bannerRepository.GetBannerListByIdListAsync(sliderDto.BannerIdList ?? new List<int>(), session),

				};
			});
		}
	}
}