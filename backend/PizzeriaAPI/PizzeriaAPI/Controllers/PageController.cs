using Microsoft.AspNetCore.Mvc;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Dto.Page;
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
        public async Task<ActionResult> AddPage([FromBody] AddPageDto pageDto)
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
            IList<PageDto> pageDtoList = new List<PageDto>();
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var pageList = await pageRepository.GetAllAsync(session);
                if (pageList != null)
                    pageDtoList = pageList.Select(GetPageDto).ToList();
            });

            return Ok(pageDtoList);
        }

        [HttpGet]
        [Route("/GetVisiblePageList")]
        [SwaggerResponse(HttpStatusCode.OK, "Page List")]
        public async Task<ActionResult<IList<PageDto>>> GetVisiblePageList()
        {
            IList<PageDto> pageDtoList = new List<PageDto>();
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var pageList = await pageRepository.GetAllAsync(session);
                if (pageList != null)
                    pageDtoList = pageList.Where(x => x.IsVisible).Select(GetPageDto).ToList();
            });

            return Ok(pageDtoList);
        }

        [HttpPatch]
        [Route("/UpdatePage")]
        [SwaggerResponse(HttpStatusCode.OK, "Page updated successfully")]
        [SwaggerResponse(HttpStatusCode.BadRequest, "Page not found")]
        public async Task<ActionResult> UpdatePage([FromBody] PageDto pageDto)
        {
            var page = await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                return await pageRepository.GetByIdAsync(pageDto.Id, session);
            });

            if (page == null)
                return BadRequest("Page not found");

            await UpdatePage(page, pageDto);
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await pageRepository.UpdateAsync(page, session);
            });

            return Ok("Page updated successfully");
        }

        private async Task UpdatePage(Page page, PageDto pageDto)
        {
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                page.Title = pageDto.Title;
                page.Content = pageDto.Content;
                page.IsVisible = pageDto.IsVisible;
                page.PictureList = await pictureRepository.GetPictureListByIdListAsync(pageDto.PictureIdList ?? new List<int>(), session);
            });
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
                Id = page.Id,
                Title = page.Title,
                Content = page.Content,
                IsVisible = page.IsVisible,
                PictureIdList = page.PictureList?.Select(x => x.PictureId ?? 0)?.ToList(),
            };
        }

        private async Task<Page> GetPage(AddPageDto pageDto)
        {
            return await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                return new Page()
                {
                    Title = pageDto.Title,
                    Content = pageDto.Content,
                    IsVisible = pageDto.IsVisible,
                    IsDeleted = false,
                    PictureList = await pictureRepository.GetPictureListByIdListAsync(pageDto.PictureIdList ?? new List<int>(), session),

                };
            });
        }
    }
}