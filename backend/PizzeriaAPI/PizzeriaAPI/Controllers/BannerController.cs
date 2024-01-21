using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Dto.Banner;
using PizzeriaAPI.ORM;
using PizzeriaAPI.Repositories;
using Swashbuckle.Swagger.Annotations;
using System.Net;

namespace PizzeriaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BannerController : ControllerBase
    {
        private readonly ILogger<BannerController> logger;
        private readonly ITransactionCoordinator transactionCoordinator;
        private readonly IBannerRepository bannerRepository;
        private readonly ISliderRepository sliderRepository;
        private readonly IPictureRepository pictureRepository;
        public BannerController(
            ILogger<BannerController> logger,
            ITransactionCoordinator transactionCoordinator,
            IBannerRepository bannerRepository,
            ISliderRepository sliderRepository,
            IPictureRepository pictureRepository)
        {
            this.logger = logger;
            this.transactionCoordinator = transactionCoordinator;
            this.bannerRepository = bannerRepository;
            this.sliderRepository = sliderRepository;
            this.pictureRepository = pictureRepository;
        }


        [HttpPost]
        [Authorize]
        [Route("/AddBanner")]
        [SwaggerResponse(HttpStatusCode.OK, "Banner inserted successfully")]
        public async Task<ActionResult> AddBanner([FromBody] AddBannerDto bannerDto)
        {
            var banner = await GetBanner(bannerDto);
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await bannerRepository.InsertAsync(banner, session);
            });

            return Ok("Banner inserted successfully");
        }

        [HttpGet]
        [Route("/GetBanner/{bannerTitle}")]
        [SwaggerResponse(HttpStatusCode.OK, "Banner got successfully", typeof(BannerDto))]
        public async Task<ActionResult<BannerDto>> GetBannerByTitle([FromRoute] string bannerTitle)
        {
            BannerDto? bannerDto = null;
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var banner = await bannerRepository.GetBannerByTitleAsync(bannerTitle, session);
                if (banner != null)
                    bannerDto = GetBannerDto(banner);
            });

            return Ok(bannerDto);
        }

        [HttpGet]
        [Route("/GetAllBannerList")]
        [SwaggerResponse(HttpStatusCode.OK, "Banner List")]
        public async Task<ActionResult<IList<BannerDto>>> GetAllBannerList()
        {
            IList<BannerDto> bannerDtoList = new List<BannerDto>();
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var bannerList = await bannerRepository.GetAllAsync(session);
                if (bannerList != null)
                    bannerDtoList = bannerList.Select(GetBannerDto).ToList();
            });

            return Ok(bannerDtoList);
        }

        [HttpGet]
        [Route("/GetVisibleBannerList")]
        [SwaggerResponse(HttpStatusCode.OK, "Banner List")]
        public async Task<ActionResult<IList<BannerDto>>> GetVisibleBannerList()
        {
            IList<BannerDto> bannerDtoList = new List<BannerDto>();
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var bannerList = await bannerRepository.GetAllAsync(session);
                if (bannerList != null)
                    bannerDtoList = bannerList.Where(x => x.IsVisible).Select(GetBannerDto).ToList();
            });

            return Ok(bannerDtoList);
        }

        [HttpPatch]
        [Route("/UpdateBanner")]
        [SwaggerResponse(HttpStatusCode.OK, "Banner updated successfully")]
        [SwaggerResponse(HttpStatusCode.BadRequest, "Banner not found")]
        public async Task<ActionResult> UpdateBanner([FromBody] BannerDto bannerDto)
        {
            var banner = await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                return await bannerRepository.GetByIdAsync(bannerDto.Id, session);
            });
            if (banner == null)
                return BadRequest("Banner not found");

            await UpdateBanner(banner, bannerDto);

            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await bannerRepository.UpdateAsync(banner, session);
            });

            return Ok("Banner updated successfully");
        }

        [HttpDelete]
        [Route("/DeleteBanner/{bannerId}")]
        [SwaggerResponse(HttpStatusCode.OK, "Banner updated successfully")]
        public async Task<ActionResult> DeleteBannerBanner([FromRoute] int bannerId)
        {
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await bannerRepository.DeleteAsync(bannerId, session);
            });

            return Ok("Banner updated successfully");
        }


        private BannerDto GetBannerDto(Banner banner)
        {
            return new BannerDto()
            {
                Id = banner?.Id ?? 0,
                Title = banner?.Title ?? "",
                Text = banner?.Text ?? "",
                SubText = banner?.SubText,
                Link = banner?.Link,
                IsVisible = banner?.IsVisible ?? true,
                PictureIdList = banner?.PictureList?.Select(x => x.PictureId ?? 0)?.ToList(),
                SliderId = banner?.Slider?.SliderId
            };
        }

        private async Task<Banner> GetBanner(AddBannerDto bannerDto)
        {
            return await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                return new Banner()
                {

                    Title = bannerDto.Title,
                    Text = bannerDto.Text,
                    SubText = bannerDto.SubText,
                    Link = bannerDto.Link,
                    IsVisible = bannerDto.IsVisible ?? true,
                    IsDeleted = false,
                    PictureList = await pictureRepository.GetPictureListByIdListAsync(bannerDto.PictureIdList ?? new List<int>(), session),
                    Slider = await sliderRepository.GetByIdAsync(bannerDto.SliderId ?? 0, session)
                };
            });
        }
        private async Task UpdateBanner(Banner banner, BannerDto bannerDto)
        {
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                banner.Title = bannerDto.Title;
                banner.Text = bannerDto.Text;
                banner.SubText = bannerDto.SubText;
                banner.Link = bannerDto.Link;
                banner.IsVisible = bannerDto.IsVisible;
                banner.PictureList = await pictureRepository.GetPictureListByIdListAsync(bannerDto?.PictureIdList ?? new List<int>(), session);
                banner.Slider = await sliderRepository.GetByIdAsync(bannerDto?.SliderId ?? 0, session);
            });

        }
    }
}
