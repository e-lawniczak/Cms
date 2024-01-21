using Microsoft.AspNetCore.Mvc;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Dto.SocialMedia;
using PizzeriaAPI.ORM;
using PizzeriaAPI.Repositories;
using Swashbuckle.Swagger.Annotations;
using System.Net;

namespace PizzeriaAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SocialMediaController : ControllerBase
    {

        private readonly ILogger<SocialMediaController> logger;
        private readonly ITransactionCoordinator transactionCoordinator;
        private readonly ISocialMediaRepository socialMediaRepository;
        private readonly IPictureRepository pictureRepository;
        private readonly ITeamMemberRepository teamMemberRepository;

        public SocialMediaController(ILogger<SocialMediaController> logger,
            ITransactionCoordinator transactionCoordinator,
            ISocialMediaRepository socialMediaRepository,
            IPictureRepository pictureRepository,
            ITeamMemberRepository teamMemberRepository)
        {
            this.logger = logger;
            this.transactionCoordinator = transactionCoordinator;
            this.socialMediaRepository = socialMediaRepository;
            this.pictureRepository = pictureRepository;
            this.teamMemberRepository = teamMemberRepository;
        }

        [HttpPost]
        [Route("/AddSocialMedia")]
        [SwaggerResponse(HttpStatusCode.OK, "SocialMedia inserted successfully")]
        public async Task<ActionResult> AddSocialMedia([FromBody] AddSocialMediaDto socialMediaDto)
        {
            var socialMedia = await GetSocialMedia(socialMediaDto);
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await socialMediaRepository.InsertAsync(socialMedia, session);
            });

            return Ok("SocialMedia inserted successfully");
        }

        [HttpGet]
        [Route("/GetAllMainSocialMedia")]
        [SwaggerResponse(HttpStatusCode.OK, "SocialMedia List")]
        public async Task<ActionResult<IList<SocialMediaDto>>> GetAllMainSocialMedia()
        {
            IList<SocialMediaDto> socialMediaDtoList = new List<SocialMediaDto>(); ;
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var socialMediaList = await socialMediaRepository.GetMainSocialMedia(session);
            });

            return Ok(socialMediaDtoList);
        }

        [HttpGet]
        [Route("/GetAllSocialMediaList")]
        [SwaggerResponse(HttpStatusCode.OK, "SocialMedia List")]
        public async Task<ActionResult<IList<SocialMediaDto>>> GetAllSocialMediaList()
        {
            IList<SocialMediaDto> socialMediaDtoList = new List<SocialMediaDto>();
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var socialMediaList = await socialMediaRepository.GetAllAsync(session);
                if (socialMediaList != null)
                    socialMediaDtoList = socialMediaList.Select(GetSocialMediaDto).ToList();
            });

            return Ok(socialMediaDtoList);
        }

        [HttpGet]
        [Route("/GetVisibleSocialMediaList")]
        [SwaggerResponse(HttpStatusCode.OK, "SocialMedia List")]
        public async Task<ActionResult<IList<SocialMediaDto>>> GetVisibleSocialMediaList()
        {
            IList<SocialMediaDto> socialMediaDtoList = new List<SocialMediaDto>(); ;
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var socialMediaList = await socialMediaRepository.GetAllAsync(session);
                if (socialMediaList != null)
                    socialMediaDtoList = socialMediaList.Where(x => x.IsVisible).Select(GetSocialMediaDto).ToList();
            });

            return Ok(socialMediaDtoList);
        }

        [HttpPatch]
        [Route("/UpdateSocialMedia")]
        [SwaggerResponse(HttpStatusCode.OK, "SocialMedia updated successfully")]
        [SwaggerResponse(HttpStatusCode.BadRequest, "SocialMedia not found")]
        public async Task<ActionResult> UpdateSocialMedia([FromBody] SocialMediaDto socialMediaDto)
        {
            var socialMedia = await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                return await socialMediaRepository.GetByIdAsync(socialMediaDto.Id, session);
            });

            if (socialMedia == null)
                return BadRequest("SocialMedia not found");

            await UpdateSocialMedia(socialMedia, socialMediaDto);
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await socialMediaRepository.UpdateAsync(socialMedia, session);
            });

            return Ok("SocialMedia updated successfully");
        }

        private async Task UpdateSocialMedia(SocialMedia socialMedia, SocialMediaDto socialMediaDto)
        {
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                socialMedia.Name = socialMediaDto.Name;
                socialMedia.Link = socialMediaDto.Link;
                socialMedia.IsMain = socialMediaDto.IsMain;
                socialMedia.IsVisible = socialMediaDto.IsVisible;
                socialMedia.PictureList = await pictureRepository.GetPictureListByIdListAsync(socialMediaDto.PictureIdList ?? new List<int>(), session);
                socialMedia.TeamMember = await teamMemberRepository.GetByIdAsync(socialMediaDto.TeamMemberId ?? 0, session);
            });
        }

        [HttpDelete]
        [Route("/DeleteSocialMedia/{socialMediaId}")]
        [SwaggerResponse(HttpStatusCode.OK, "SocialMedia was deleted successfully")]
        public async Task<ActionResult> DeletSocialMedia([FromRoute] int socialMediaId)
        {
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await socialMediaRepository.DeleteAsync(socialMediaId, session);
            });

            return Ok("SocialMedia was deleted successfully");
        }


        private SocialMediaDto GetSocialMediaDto(SocialMedia socialMedia)
        {
            return new SocialMediaDto()
            {
                Id = socialMedia.Id,
                Name = socialMedia.Name,
                Link = socialMedia.Link,
                IsMain = socialMedia.IsMain,
                IsVisible = socialMedia.IsVisible,
                PictureIdList = socialMedia.PictureList?.Select(x => x.PictureId ?? 0)?.ToList(),
                TeamMemberId = socialMedia.TeamMember?.Id
            };
        }

        private async Task<SocialMedia> GetSocialMedia(AddSocialMediaDto socialMediaDto)
        {
            return await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                return new SocialMedia()
                {
                    Name = socialMediaDto.Name,
                    Link = socialMediaDto.Link,
                    IsMain = socialMediaDto.IsMain,
                    IsVisible = socialMediaDto.IsVisible,
                    IsDeleted = false,
                    PictureList = await pictureRepository.GetPictureListByIdListAsync(socialMediaDto.PictureIdList ?? new List<int>(), session),
                    TeamMember = await teamMemberRepository.GetByIdAsync(socialMediaDto.TeamMemberId ?? 0, session)

                };
            });
        }
    }
}