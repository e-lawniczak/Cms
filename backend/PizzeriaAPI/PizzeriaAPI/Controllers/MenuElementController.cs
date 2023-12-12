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
		public async Task<ActionResult> AddMenuElement([FromBody] MenuElementDto menuElementDto)
		{
			var menuElement = GetMenuElement(menuElementDto);
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
			IList<MenuElementDto> menuElementDtoList = null;
			await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
				var menuElementList = await menuElementRepository.GetAllAsync(session);
				menuElementDtoList = menuElementList.Select(GetMenuElementDto).ToList();
			});

			return Ok(menuElementDtoList);
		}

		[HttpGet]
		[Route("/GetVisibleMenuElementList")]
		[SwaggerResponse(HttpStatusCode.OK, "MenuElement List")]
		public async Task<ActionResult<IList<MenuElementDto>>> GetVisibleMenuElementList()
		{
			IList<MenuElementDto> menuElementDtoList = null;
			await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
				var menuElementList = await menuElementRepository.GetAllAsync(session);
				menuElementDtoList = menuElementList.Where(x => x.IsVisible).Select(GetMenuElementDto).ToList();
			});

			return Ok(menuElementDtoList);
		}

		[HttpPatch]
		[Route("/UpdateMenuElement")]
		[SwaggerResponse(HttpStatusCode.OK, "MenuElement updated successfully")]
		public async Task<ActionResult> UpdateMenuElement([FromBody] MenuElementDto menuElementDto)
		{
			var menuElement = GetMenuElement(menuElementDto);
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await menuElementRepository.InsertAsync(menuElement, session);
			});

			return Ok("MenuElement updated successfully");
		}
		[HttpDelete]
		[Route("/DeleteMenuElement/{menuElementId}")]
		[SwaggerResponse(HttpStatusCode.OK, "MenuElement was deleted successfully")]
		public async Task<ActionResult> DeletMenuElement([FromRoute] int menuElementId)
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
				MenuElementId = menuElement?.MenuElementId,
				Text = menuElement.Text,
				Link = menuElement.Link,
				IsVisible = menuElement.IsVisible,
				ParentMenuElementId = menuElement.ParentMenuElement.MenuElementId
			};
		}
		private MenuElement GetMenuElement(MenuElementDto menuElementDto)
		{
			return transactionCoordinator.InRollbackScope(session => {
				return new MenuElement()
				{

					MenuElementId = menuElementDto?.MenuElementId ?? 0,
					Text = menuElementDto.Text,
					Link = menuElementDto.Link,
					IsVisible = menuElementDto.IsVisible ?? true,
					IsDeleted = false,
					ParentMenuElement = menuElementRepository.GetByIdAsync(menuElementDto.MenuElementId?? 0, session).Result

				};
			});
		}
	}
}