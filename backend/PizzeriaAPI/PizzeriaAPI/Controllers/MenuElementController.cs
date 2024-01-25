using Microsoft.AspNetCore.Mvc;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Dto.MenuElement;
using PizzeriaAPI.ORM;
using PizzeriaAPI.Repositories.ExtendedBaseEntityRepositories;
using Swashbuckle.Swagger.Annotations;
using System.Net;

namespace PizzeriaAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MenuElementController : ControllerBase
    {

        private readonly ILogger<MenuElementController> logger;
        private readonly ITransactionCoordinator transactionCoordinator;
        private readonly IMenuElementRepository menuElementRepository;

        public MenuElementController(ILogger<MenuElementController> logger,
            ITransactionCoordinator transactionCoordinator,
            IMenuElementRepository menuElementRepository)
        {
            this.logger = logger;
            this.transactionCoordinator = transactionCoordinator;
            this.menuElementRepository = menuElementRepository;
        }

        [HttpPost]
        [Route("/AddMenuElement")]
        [SwaggerResponse(HttpStatusCode.OK, "MenuElement inserted successfully")]
        public async Task<ActionResult> AddMenuElement([FromBody] AddMenuElementDto menuElementDto)
        {
            var menuElement = await GetMenuElement(menuElementDto);
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await menuElementRepository.InsertAsync(menuElement, session);
            });

            return Ok("MenuElement inserted successfully");
        }


        [HttpGet]
        [Route("/GetAllMenuElementList")]
        [SwaggerResponse(HttpStatusCode.OK, "MenuElement List")]
        public async Task<ActionResult<IList<MenuElementDto>>> GetAllMenuElementList()
        {
            IList<MenuElementDto> menuElementDtoList = new List<MenuElementDto>();
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var menuElementList = await menuElementRepository.GetAllAsync(session);
                if (menuElementList != null)
                    menuElementDtoList = menuElementList.Select(GetMenuElementDto).ToList();
            });

            return Ok(menuElementDtoList);
        }

        [HttpGet]
        [Route("/GetVisibleMenuElementList")]
        [SwaggerResponse(HttpStatusCode.OK, "MenuElement List")]
        public async Task<ActionResult<IList<MenuElementDto>>> GetVisibleMenuElementList()
        {
            IList<MenuElementDto> menuElementDtoList = new List<MenuElementDto>();
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var menuElementList = await menuElementRepository.GetVisibleAsync(session);
                if (menuElementList != null)
                    menuElementDtoList = menuElementList.Select(GetMenuElementDto).ToList();
            });

            return Ok(menuElementDtoList);
        }

        [HttpPatch]
        [Route("/UpdateMenuElement")]
        [SwaggerResponse(HttpStatusCode.OK, "MenuElement updated successfully")]
        [SwaggerResponse(HttpStatusCode.BadRequest, "MenuElement not found")]
        public async Task<ActionResult> UpdateMenuElement([FromBody] MenuElementDto menuElementDto)
        {
            var menuElement = await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                return await menuElementRepository.GetByIdAsync(menuElementDto.MenuElementId, session);
            });

            if (menuElement == null)
                return BadRequest("MenuElement not found");

            await UpdateMenuElement(menuElement, menuElementDto);
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await menuElementRepository.UpdateAsync(menuElement, session);
            });

            return Ok("MenuElement updated successfully");
        }

        private async Task UpdateMenuElement(MenuElement menuElement, MenuElementDto menuElementDto)
        {
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                menuElement.Id = menuElementDto.MenuElementId;
                menuElement.Text = menuElementDto.Text;
                menuElement.Link = menuElementDto.Link;
                menuElement.IsVisible = menuElementDto.IsVisible;
                menuElement.ParentMenuElement = await menuElementRepository.GetByIdAsync(menuElementDto.ParentMenuElementId ?? 0, session);
            });
        }

        [HttpDelete]
        [Route("/DeleteMenuElement/{menuElementId}")]
        [SwaggerResponse(HttpStatusCode.OK, "MenuElement was deleted successfully")]
        public async Task<ActionResult> DeleteMenuElement([FromRoute] int menuElementId)
        {
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await menuElementRepository.DeleteAsync(menuElementId, session);
            });

            return Ok("MenuElement was deleted successfully");
        }

        private MenuElementDto GetMenuElementDto(MenuElement menuElement)
        {
            return new MenuElementDto()
            {
                MenuElementId = menuElement.Id,
                Text = menuElement.Text,
                Link = menuElement.Link,
                IsVisible = menuElement.IsVisible,
                ParentMenuElementId = menuElement.ParentMenuElement?.Id
            };
        }
        private async Task<MenuElement> GetMenuElement(MenuElementDto menuElementDto)
        {
            return await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                return new MenuElement()
                {

                    Id = menuElementDto.MenuElementId,
                    Text = menuElementDto.Text,
                    Link = menuElementDto.Link,
                    IsVisible = menuElementDto.IsVisible,
                    IsDeleted = false,
                    ParentMenuElement = await menuElementRepository.GetByIdAsync(menuElementDto?.ParentMenuElementId ?? 0, session)
                };
            });
        }

        private async Task<MenuElement> GetMenuElement(AddMenuElementDto menuElementDto)
        {
            return await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                return new MenuElement()
                {

                    Text = menuElementDto.Text,
                    Link = menuElementDto.Link,
                    IsVisible = menuElementDto.IsVisible,
                    IsDeleted = false,
                    ParentMenuElement = await menuElementRepository.GetByIdAsync(menuElementDto?.ParentMenuElementId ?? 0, session)
                };
            });
        }
    }
}