using Microsoft.AspNetCore.Mvc;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Dto.TabSlider;
using PizzeriaAPI.ORM;
using PizzeriaAPI.Repositories;
using Swashbuckle.Swagger.Annotations;
using System.Net;

namespace PizzeriaAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TabSliderController : ControllerBase
    {

        private readonly ILogger<TabSliderController> logger;
        private readonly ITransactionCoordinator transactionCoordinator;
        private readonly ITabSliderRepository tabSliderRepository;
        private readonly IInformationTabRepository informationTabRepository;
        private readonly IPictureRepository pictureRepository;

        public TabSliderController(ILogger<TabSliderController> logger,
            ITransactionCoordinator transactionCoordinator,
            ITabSliderRepository tabSliderRepository,
            IInformationTabRepository informationTabRepository,
            IPictureRepository pictureRepository)
        {
            this.logger = logger;
            this.transactionCoordinator = transactionCoordinator;
            this.tabSliderRepository = tabSliderRepository;
            this.informationTabRepository = informationTabRepository;
            this.pictureRepository = pictureRepository;
        }

        [HttpPost]
        [Route("/AddTabSlider")]
        [SwaggerResponse(HttpStatusCode.OK, "TabSlider inserted successfully")]
        public async Task<ActionResult> AddTabSlider([FromBody] AddTabSliderDto tabSliderDto)
        {
            var tabSlider = await GetTabSlider(tabSliderDto);
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await tabSliderRepository.InsertAsync(tabSlider, session);
            });

            return Ok("TabSlider inserted successfully");
        }

        [HttpGet]
        [Route("/GetTabSlider/{tabSliderTitle}")]
        [SwaggerResponse(HttpStatusCode.OK, "TabSlider got successfully", typeof(TabSliderDto))]
        public async Task<ActionResult<TabSliderDto>> GetTabSlider([FromRoute] string tabSliderTitle)
        {
            TabSliderDto? tabSliderDto = null;
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var tabSlider = await tabSliderRepository.GetTabSliderByTitleAsync(tabSliderTitle, session);
                if (tabSlider != null)
                    tabSliderDto = GetTabSliderDto(tabSlider);
            });

            return Ok(tabSliderDto);
        }

        [HttpGet]
        [Route("/GetAllTabSliderList")]
        [SwaggerResponse(HttpStatusCode.OK, "TabSlider List")]
        public async Task<ActionResult<IList<TabSliderDto>>> GetAllTabSliderList()
        {
            IList<TabSliderDto> tabSliderDtoList = new List<TabSliderDto>();
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var tabSliderList = await tabSliderRepository.GetAllAsync(session);
                if (tabSliderList != null)
                    tabSliderDtoList = tabSliderList.Select(GetTabSliderDto).ToList();
            });

            return Ok(tabSliderDtoList);
        }

        [HttpGet]
        [Route("/GetVisibleTabSliderList")]
        [SwaggerResponse(HttpStatusCode.OK, "TabSlider List")]
        public async Task<ActionResult<IList<TabSliderDto>>> GetVisibleTabSliderList()
        {
            IList<TabSliderDto> tabSliderDtoList = new List<TabSliderDto>();
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var tabSliderList = await tabSliderRepository.GetVisibleAsync(session);
                if (tabSliderList != null)
                    tabSliderDtoList = tabSliderList.Select(GetTabSliderDto).ToList();
            });

            return Ok(tabSliderDtoList);
        }

        [HttpPatch]
        [Route("/UpdateTabSlider")]
        [SwaggerResponse(HttpStatusCode.OK, "TabSlider updated successfully")]
        [SwaggerResponse(HttpStatusCode.BadRequest, "TabSlider not found")]
        public async Task<ActionResult> UpdateTabSlider([FromBody] TabSliderDto tabSliderDto)
        {
            var tabSlider = await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                return await tabSliderRepository.GetByIdAsync(tabSliderDto.Id, session);
            });

            if (tabSlider == null)
                return BadRequest("TabSlider not found");

            await UpdateTabSlider(tabSlider, tabSliderDto);
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await tabSliderRepository.UpdateAsync(tabSlider, session);
            });

            return Ok("TabSlider updated successfully");
        }

        private async Task UpdateTabSlider(TabSlider tabSlider, TabSliderDto tabSliderDto)
        {
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                tabSlider.Title = tabSliderDto.Title;
                tabSlider.IsVisible = tabSliderDto.IsVisible;
                tabSlider.InformationTabList = await informationTabRepository.GetInformationTabListByIdListAsync(tabSliderDto.InformationTabIdList ?? new List<int>(), session);
                tabSlider.PictureList = await pictureRepository.GetPictureListByIdListAsync(tabSliderDto.PictureIdList ?? new List<int>(), session);
            });
        }

        [HttpDelete]
        [Route("/DeleteTabSlider/{tabSliderId}")]
        [SwaggerResponse(HttpStatusCode.OK, "TabSlider was deleted successfully")]
        public async Task<ActionResult> DeletTabSlider([FromRoute] int tabSliderId)
        {
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await tabSliderRepository.DeleteAsync(tabSliderId, session);
            });

            return Ok("TabSlider was deleted successfully");
        }

        private TabSliderDto GetTabSliderDto(TabSlider tabSlider)
        {
            return new TabSliderDto()
            {
                Id = tabSlider.Id,
                Title = tabSlider.Title,
                IsVisible = tabSlider.IsVisible,
                PictureIdList = tabSlider.PictureList?.Select(x => x.PictureId)?.ToList(),
                InformationTabIdList = tabSlider.InformationTabList?.Select(x => x.InformationTabId)?.ToList()
            };
        }
        private async Task<TabSlider> GetTabSlider(AddTabSliderDto tabSliderDto)
        {
            return await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                return new TabSlider()
                {
                    Title = tabSliderDto.Title,
                    IsVisible = tabSliderDto.IsVisible,
                    IsDeleted = false,
                    InformationTabList = await informationTabRepository.GetInformationTabListByIdListAsync(tabSliderDto.InformationTabIdList ?? new List<int>(), session),
                    PictureList = await pictureRepository.GetPictureListByIdListAsync(tabSliderDto.PictureIdList ?? new List<int>(), session)
                };
            });
        }
    }
}