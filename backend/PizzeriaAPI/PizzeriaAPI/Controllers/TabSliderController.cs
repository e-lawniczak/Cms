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
	public class TabSliderController : ControllerBase
	{

		private readonly ILogger<TabSliderController> logger;
		private readonly ITransactionCoordinator transactionCoordinator;
		private readonly ITabSliderRepository tabSliderRepository;
		private readonly IPictureRepository pictureRepository;
		private readonly ITeamMemberRepository teamMemberRepository;
		private readonly IInformationTabRepository informationTabRepository;

		public TabSliderController(ILogger<TabSliderController> logger,
			ITransactionCoordinator transactionCoordinator,
			ITabSliderRepository tabSliderRepository,
			IPictureRepository pictureRepository,
			ITeamMemberRepository teamMemberRepository,
			IInformationTabRepository informationTabRepository)
		{
			this.logger = logger;
			this.transactionCoordinator = transactionCoordinator;
			this.tabSliderRepository = tabSliderRepository;
			this.pictureRepository = pictureRepository;
			this.teamMemberRepository = teamMemberRepository;
		}

		[HttpPost]
		[Route("/AddTabSlider")]
		[SwaggerResponse(HttpStatusCode.OK, "TabSlider inserted successfully")]
		public async Task<ActionResult> AddTabSlider([FromBody] TabSliderDto tabSliderDto)
		{
			var tabSlider = GetTabSlider(tabSliderDto);
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await tabSliderRepository.InsertOrUpdateAsync(tabSlider, session);
			});

			return Ok("TabSlider inserted successfully");
		}


		[HttpGet]
		[Route("/GetAllTabSliderList")]
		[SwaggerResponse(HttpStatusCode.OK, "TabSlider List")]
		public async Task<ActionResult<IList<TabSliderDto>>> GetAllTabSliderList()
		{
			IList<TabSliderDto> tabSliderDtoList = null;
			await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
				var tabSliderList = await tabSliderRepository.GetAllAsync(session);
				tabSliderDtoList = tabSliderList.Select(GetTabSliderDto).ToList();
			});

			return Ok(tabSliderDtoList);
		}

		[HttpGet]
		[Route("/GetVisibleTabSliderList")]
		[SwaggerResponse(HttpStatusCode.OK, "TabSlider List")]
		public async Task<ActionResult<IList<TabSliderDto>>> GetVisibleTabSliderList()
		{
			IList<TabSliderDto> tabSliderDtoList = null;
			await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
				var tabSliderList = await tabSliderRepository.GetAllAsync(session);
				tabSliderDtoList = tabSliderList.Where(x => x.IsVisible).Select(GetTabSliderDto).ToList();
			});

			return Ok(tabSliderDtoList);
		}

		[HttpPatch]
		[Route("/UpdateTabSlider")]
		[SwaggerResponse(HttpStatusCode.OK, "TabSlider updated successfully")]
		public async Task<ActionResult> UpdateTabSlider([FromBody] TabSliderDto tabSliderDto)
		{
			var tabSlider = GetTabSlider(tabSliderDto);
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await tabSliderRepository.InsertOrUpdateAsync(tabSlider, session);
			});

			return Ok("TabSlider updated successfully");
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
				Id = tabSlider?.Id ?? 0,
				Title = tabSlider.Title,
				CreateDate = tabSlider.CreateDate,
				ModificationDate = tabSlider.ModificationDate,
				IsVisible = tabSlider.IsVisible,
				PictureIdList = tabSlider.PictureList.Select(x => x.PictureId).ToList(),
				InformationTabIdList = tabSlider.InformationTabList.Select(x=>x.InformationTabId).ToList()
			};
		}
		private TabSlider GetTabSlider(TabSliderDto tabSliderDto)
		{
			return transactionCoordinator.InRollbackScope(session => {
				return new TabSlider()
				{

					Id = tabSliderDto?.Id ?? 0,
					Title = tabSliderDto.Title,
					CreateDate = tabSliderDto.CreateDate ?? DateTime.Now,
					ModificationDate = tabSliderDto.ModificationDate ?? DateTime.Now,
					IsVisible = tabSliderDto.IsVisible ?? true,
					IsDeleted = false,
					InformationTabList = informationTabRepository.GetInformationTabListByIdListAsync(tabSliderDto.InformationTabIdList ?? new List<int>(), session).Result

				};
			});
		}
	}
}