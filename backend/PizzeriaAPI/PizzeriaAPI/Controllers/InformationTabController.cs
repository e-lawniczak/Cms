using Microsoft.AspNetCore.Mvc;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Dto.InformationTab;
using PizzeriaAPI.ORM;
using PizzeriaAPI.Repositories.EntityWithPictureRepositories;
using PizzeriaAPI.Repositories.ExtendedBaseEntityRepositories;
using Swashbuckle.Swagger.Annotations;
using System.Net;

namespace PizzeriaAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InformationTabController : ControllerBase
    {
        private readonly ITransactionCoordinator transactionCoordinator;
        private readonly IInformationTabRepository informationTabRepository;
        private readonly ITabSliderRepository tabSliderRepository;

        public InformationTabController(
            ITransactionCoordinator transactionCoordinator,
            IInformationTabRepository informationTabRepository,
            ITabSliderRepository tabSliderRepository)
        {
            this.transactionCoordinator = transactionCoordinator;
            this.informationTabRepository = informationTabRepository;
            this.tabSliderRepository = tabSliderRepository;
        }
        [HttpPost]
        [Route("/AddInformationTab")]
        public async Task<ActionResult> AddInformationTab([FromBody] AddInformationTabDto informationTabDto)
        {
            var informationTab = await GetInformationTab(informationTabDto);
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await informationTabRepository.InsertAsync(informationTab, session);
            });

            return Ok("InformationTab inserted successfully");
        }

        [HttpGet]
        [Route("/GetAllInformationTabList")]
        [SwaggerResponse(HttpStatusCode.OK, "GetAllInformationTabL List")]
        public async Task<ActionResult<IList<InformationTabDto>>> GetAllInformationTabList()
        {
            IList<InformationTabDto> informationTabDtoList = new List<InformationTabDto>();
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var informationTabList = await informationTabRepository.GetAllAsync(session);
                if (informationTabList != null)
                    informationTabDtoList = informationTabList.Select(GetInformationTabDto).ToList();
            });

            return Ok(informationTabDtoList);
        }

        [HttpGet]
        [Route("/GetVisibleInformationTabList")]
        [SwaggerResponse(HttpStatusCode.OK, "InformationTab List")]
        public async Task<ActionResult<IList<InformationTabDto>>> GetVisibleInformationTabList()
        {
            IList<InformationTabDto> InformationTabDtoList = new List<InformationTabDto>();
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var informationTabList = await informationTabRepository.GetVisibleAsync(session);
                if (informationTabList != null)
                    InformationTabDtoList = informationTabList.Select(GetInformationTabDto).ToList();
            });

            return Ok(InformationTabDtoList);
        }

        [HttpPatch]
        [Route("/UpdateInformationTab")]
        [SwaggerResponse(HttpStatusCode.OK, "InformationTab updated successfully")]
        [SwaggerResponse(HttpStatusCode.BadRequest, "InformationTab not found")]
        public async Task<ActionResult> UpdateInformationTab([FromBody] InformationTabDto InformationTabDto)
        {
            var informationTab = await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                return await informationTabRepository.GetByIdAsync(InformationTabDto.InformationTabId, session);
            });
            if (informationTab == null)
            {
                return BadRequest("InformationTab not found");
            }

            await UpdateInformationTab(informationTab, InformationTabDto);
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await informationTabRepository.UpdateAsync(informationTab, session);
            });

            return Ok("InformationTab updated successfully");
        }

        private async Task UpdateInformationTab(InformationTab informationTab, InformationTabDto informationTabDto)
        {
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                informationTab.Title = informationTabDto.Title;
                informationTab.Text = informationTabDto.Text;
                informationTab.ButtonText = informationTabDto.ButtonText;
                informationTab.IsVisible = informationTabDto.IsVisible;
                informationTab.TabSlider = await tabSliderRepository.GetByIdAsync(informationTabDto.TabSliderId ?? 0, session);
            });
        }

        [HttpDelete]
        [Route("/DeleteInformationTab/{informationTabId}")]
        [SwaggerResponse(HttpStatusCode.OK, "InformationTab was deleted successfully")]
        public async Task<ActionResult> DeletInformationTab([FromRoute] int informationTabId)
        {
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await informationTabRepository.DeleteAsync(informationTabId, session);
            });

            return Ok("InformationTab was deleted successfully");
        }

        private async Task<InformationTab> GetInformationTab(AddInformationTabDto informationTabDto)
        {
            return await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                return new InformationTab
                {
                    Title = informationTabDto.Title,
                    Text = informationTabDto.Text,
                    ButtonText = informationTabDto.ButtonText,
                    IsVisible = informationTabDto.IsVisible,
                    IsDeleted = false,
                    TabSlider = await tabSliderRepository.GetByIdAsync(informationTabDto.TabSliderId ?? 0, session)
                };
            });
        }
        private InformationTabDto GetInformationTabDto(InformationTab informationTab)
        {
            return new InformationTabDto
            {
                InformationTabId = informationTab.Id,
                Title = informationTab.Title,
                Text = informationTab.Text,
                ButtonText = informationTab.ButtonText,
                IsVisible = informationTab.IsVisible,
                TabSliderId = informationTab.TabSlider?.Id
            };
        }
    }
}
