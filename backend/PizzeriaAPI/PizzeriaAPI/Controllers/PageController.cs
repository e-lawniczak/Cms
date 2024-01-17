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
	public class PageController : ControllerBase
	{

		private readonly ILogger<PageController> logger;
		private readonly ITransactionCoordinator transactionCoordinator;
		private readonly IPageRepository pageRepository;
		private readonly IPictureRepository pictureRepository;
		private readonly ITeamMemberRepository teamMemberRepository;

		public PageController(ILogger<PageController> logger,
			ITransactionCoordinator transactionCoordinator,
			IPageRepository pageRepository,
			IPictureRepository pictureRepository,
			ITeamMemberRepository teamMemberRepository)
		{
			this.logger = logger;
			this.transactionCoordinator = transactionCoordinator;
			this.pageRepository = pageRepository;
			this.pictureRepository = pictureRepository;
			this.teamMemberRepository = teamMemberRepository;
		}

		[HttpPost]
		[Route("/AddPage")]
		[SwaggerResponse(HttpStatusCode.OK, "Page inserted successfully")]
		public async Task<ActionResult> AddPage([FromBody] PageDto pageDto)
		{
			var page = await GetPage(pageDto);
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await pageRepository.InsertAsync(page, session);
			});

			return Ok("Page inserted successfully");
		}


		[HttpGet]
		[Route("/GetAllPageList")]
		[SwaggerResponse(HttpStatusCode.OK, "Page List")]
		public async Task<ActionResult<IList<PageDto>>> GetAllPageList()
		{
			IList<PageDto> pageDtoList = null;
			await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
				var pageList = await pageRepository.GetAllAsync(session);
				pageDtoList = pageList.Select(GetPageDto).ToList();
			});

			return Ok(pageDtoList);
		}

		[HttpGet]
		[Route("/GetVisiblePageList")]
		[SwaggerResponse(HttpStatusCode.OK, "Page List")]
		public async Task<ActionResult<IList<PageDto>>> GetVisiblePageList()
		{
			IList<PageDto> pageDtoList = null;
			await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
				var pageList = await pageRepository.GetAllAsync(session);
				pageDtoList = pageList.Where(x => x.IsVisible).Select(GetPageDto).ToList();
			});

			return Ok(pageDtoList);
		}

		[HttpPatch]
		[Route("/UpdatePage")]
		[SwaggerResponse(HttpStatusCode.OK, "Page updated successfully")]
		public async Task<ActionResult> UpdatePage([FromBody] PageDto pageDto)
		{
			var page = await GetPage(pageDto);
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await pageRepository.UpdateAsync(page, session);
			});

			return Ok("Page updated successfully");
		}
		[HttpDelete]
		[Route("/DeletePage/{pageId}")]
		[SwaggerResponse(HttpStatusCode.OK, "Page was deleted successfully")]
		public async Task<ActionResult> DeletPage([FromRoute] int pageId)
		{
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await pageRepository.DeleteAsync(pageId, session);
			});

			return Ok("Page was deleted successfully");
		}

		private PageDto GetPageDto(Page page)
		{
			return new PageDto()
			{
				Id = page?.Id ?? 0,
				Title = page.Title,
				Content = page.Content,
				IsVisible = page.IsVisible,
				PictureIdList = page.PictureList.Select(x => x.PictureId).ToList(),
			};
		}
		private async Task<Page> GetPage(PageDto pageDto)
		{
			return await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
				return new Page()
				{

					Id = pageDto?.Id ?? 0,
					Title = pageDto.Title,
					Content = pageDto.Content,
					IsVisible = pageDto.IsVisible ?? true,
					IsDeleted = false,
					PictureList = await pictureRepository.GetPictureListByIdListAsync(pageDto.PictureIdList ?? new List<int>(), session),

				};
			});
		}
	}
}