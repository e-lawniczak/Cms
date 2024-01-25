using Microsoft.AspNetCore.Mvc;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Dto.Slider;
using PizzeriaAPI.ORM;
using PizzeriaAPI.Repositories.EntityWithPictureRepositories;
using PizzeriaAPI.Repositories.ExtendedBaseEntityRepositories;
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
        public async Task<ActionResult> AddSlider([FromBody] AddSliderDto sliderDto)
        {
            var slider = await GetSlider(sliderDto);
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await sliderRepository.InsertAsync(slider, session);
            });

            return Ok("Slider inserted successfully");
        }

        [HttpGet]
        [Route("/GetSlider/{sliderName}")]
        public async Task<ActionResult<SliderDto>> GetSlider([FromRoute] string sliderName)
        {
            SliderDto? sliderDto = null;
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var slider = await sliderRepository.GetSliderByNameAsync(sliderName, session);
                if (slider != null)
                    sliderDto = GetSliderDto(slider);
            });

            return Ok(sliderDto);
        }

        [HttpGet]
        [Route("/GetAllSliderList")]
        [SwaggerResponse(HttpStatusCode.OK, "Slider List")]
        public async Task<ActionResult<IList<SliderDto>>> GetAllSliderList()
        {
            IList<SliderDto> sliderDtoList = new List<SliderDto>();
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var sliderList = await sliderRepository.GetAllAsync(session);
                if (sliderList != null)
                    sliderDtoList = sliderList.Select(GetSliderDto).ToList();
            });

            return Ok(sliderDtoList);
        }

        [HttpGet]
        [Route("/GetVisibleSliderList")]
        [SwaggerResponse(HttpStatusCode.OK, "Slider List")]
        public async Task<ActionResult<IList<SliderDto>>> GetVisibleSliderList()
        {
            IList<SliderDto> sliderDtoList = new List<SliderDto>();
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var sliderList = await sliderRepository.GetVisibleAsync(session);
                if (sliderList != null)
                    sliderDtoList = sliderList.Select(GetSliderDto).ToList();
            });

            return Ok(sliderDtoList);
        }

        [HttpPatch]
        [Route("/UpdateSlider")]
        [SwaggerResponse(HttpStatusCode.OK, "Slider updated successfully")]
        [SwaggerResponse(HttpStatusCode.BadRequest, "Slider not found")]
        public async Task<ActionResult> UpdateSlider([FromBody] SliderDto sliderDto)
        {
            var slider = await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                return await sliderRepository.GetByIdAsync(sliderDto.SliderId, session);
            });

            if (slider == null)
                return BadRequest("Slider not found");

            await UpdateSlider(slider, sliderDto);
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await sliderRepository.UpdateAsync(slider, session);
            });

            return Ok("Slider updated successfully");
        }

        private async Task UpdateSlider(Slider slider, SliderDto sliderDto)
        {
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                slider.Name = sliderDto.Name;
                slider.IsVisible = sliderDto.IsVisible;
                slider.BannerList = await bannerRepository.GetByIdListAsync(sliderDto.BannerIdList ?? new List<int>(), session);
            });
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
                SliderId = slider.Id,
                Name = slider.Name,
                IsVisible = slider.IsVisible,
                BannerIdList = slider.BannerList?.Select(x => x.Id)?.ToList(),
            };
        }
        private async Task<Slider> GetSlider(AddSliderDto sliderDto)
        {
            return await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                return new Slider()
                {
                    Name = sliderDto.Name,
                    IsVisible = sliderDto.IsVisible,
                    BannerList = await bannerRepository.GetByIdListAsync(sliderDto.BannerIdList ?? new List<int>(), session),
                };
            });
        }
    }
}