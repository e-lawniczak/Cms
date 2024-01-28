using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Dto.TeamMember;
using PizzeriaAPI.ORM;
using PizzeriaAPI.Repositories.BaseEntityRepositories;
using PizzeriaAPI.Repositories.EntityWithPictureRepositories;
using PizzeriaAPI.Repositories.ExtendedBaseEntityRepositories;
using Swashbuckle.Swagger.Annotations;
using System.Net;

namespace PizzeriaAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TeamMemberController : ControllerBase
    {

        private readonly ILogger<TeamMemberController> logger;
        private readonly ITransactionCoordinator transactionCoordinator;
        private readonly ISocialMediaRepository socialMediaRepository;
        private readonly IPictureRepository pictureRepository;
        private readonly ITeamMemberRepository teamMemberRepository;
        private readonly IRoleRepository roleRepository;

        public TeamMemberController(ILogger<TeamMemberController> logger,
            ITransactionCoordinator transactionCoordinator,
            ISocialMediaRepository socialMediaRepository,
            IPictureRepository pictureRepository,
            ITeamMemberRepository teamMemberRepository,
            IRoleRepository roleRepository)
        {
            this.logger = logger;
            this.transactionCoordinator = transactionCoordinator;
            this.socialMediaRepository = socialMediaRepository;
            this.pictureRepository = pictureRepository;
            this.teamMemberRepository = teamMemberRepository;
            this.roleRepository = roleRepository;
        }

        [HttpPost]
        [Route("/AddTeamMember")]
        [Authorize]
        [SwaggerResponse(HttpStatusCode.OK, "TeamMember inserted successfully")]
        public async Task<ActionResult> AddTeamMember([FromBody] AddTeamMemberDto teamMemberDto)
        {
            var teamMember = await GetTeamMember(teamMemberDto);
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await teamMemberRepository.InsertAsync(teamMember, session);
            });

            return Ok("TeamMember inserted successfully");
        }


        [HttpGet]
        [Route("/GetAllTeamMemberList")]
        [SwaggerResponse(HttpStatusCode.OK, "TeamMember List")]
        public async Task<ActionResult<IList<TeamMemberDto>>> GetAllTeamMemberList()
        {
            IList<TeamMemberDto> teamMemberDtoList = new List<TeamMemberDto>();
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var teamMemberList = await teamMemberRepository.GetAllAsync(session);
                if (teamMemberList != null)
                    teamMemberDtoList = teamMemberList.Select(GetTeamMemberDto).ToList();
            });

            return Ok(teamMemberDtoList);
        }

        [HttpGet]
        [Route("/GetVisibleTeamMemberList")]
        [SwaggerResponse(HttpStatusCode.OK, "TeamMember List")]
        public async Task<ActionResult<IList<TeamMemberDto>>> GetVisibleTeamMemberList()
        {
            IList<TeamMemberDto> teamMemberDtoList = new List<TeamMemberDto>();
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var teamMemberList = await teamMemberRepository.GetVisibleAsync(session);
                if (teamMemberList != null)
                    teamMemberDtoList = teamMemberList.Select(GetTeamMemberDto).ToList();
            });

            return Ok(teamMemberDtoList);
        }

        [HttpPatch]
        [Route("/UpdateTeamMember")]
        [Authorize]
        [SwaggerResponse(HttpStatusCode.OK, "TeamMember updated successfully")]
        [SwaggerResponse(HttpStatusCode.BadRequest, "TeamMember not found")]
        public async Task<ActionResult> UpdateTeamMember([FromBody] TeamMemberDto TeamMemberDto)
        {
            var teamMember = await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                return await teamMemberRepository.GetByIdAsync(TeamMemberDto.Id, session);
            });

            if (teamMember == null)
                return BadRequest("TeamMember not found");

            await UpdateTeamMember(teamMember, TeamMemberDto);
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await teamMemberRepository.UpdateAsync(teamMember, session);
            });

            return Ok("TeamMember updated successfully");
        }

        private async Task UpdateTeamMember(TeamMember teamMember, TeamMemberDto teamMemberDto)
        {
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                teamMember.IsVisible = teamMemberDto.IsVisible;
                teamMember.FirstName = teamMemberDto.FirstName;
                teamMember.LastName = teamMemberDto.LastName;
                teamMember.Role = await roleRepository.GetByIdAsync(teamMemberDto.RoleId ?? 0, session);
                teamMember.SocialMediaList = await socialMediaRepository.GetByIdListAsync(teamMemberDto.SocialMediaIdList ?? new List<int>(), session);
                teamMember.PictureList = await pictureRepository.GetPictureListByIdListAsync(teamMemberDto.PictureIdList ?? new List<int>(), session);
            });
        }

        [HttpDelete]
        [Route("/DeleteTeamMember/{teamMemberId}")]
        [Authorize]
        [SwaggerResponse(HttpStatusCode.OK, "TeamMember was deleted successfully")]
        public async Task<ActionResult> DeletTeamMember([FromRoute] int teamMemberId)
        {
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await teamMemberRepository.DeleteAsync(teamMemberId, session);
            });

            return Ok("TeamMember was deleted successfully");
        }

        private TeamMemberDto GetTeamMemberDto(TeamMember teamMember)
        {
            return new TeamMemberDto()
            {
                Id = teamMember.Id,
                IsVisible = teamMember.IsVisible,
                PictureIdList = teamMember.PictureList?.Select(x => x.Id).ToList(),
                FirstName = teamMember.FirstName,
                LastName = teamMember.LastName,
                RoleId = teamMember.Role?.Id,
                SocialMediaIdList = teamMember.SocialMediaList?.Select(x => x.Id).ToList(),
            };
        }

        private async Task<TeamMember> GetTeamMember(AddTeamMemberDto teamMemberDto)
        {
            return await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                return new TeamMember()
                {
                    IsVisible = teamMemberDto.IsVisible,
                    FirstName = teamMemberDto.FirstName,
                    LastName = teamMemberDto.LastName,
                    IsDeleted = false,
                    Role = await roleRepository.GetByIdAsync(teamMemberDto.RoleId ?? 0, session),
                    SocialMediaList = await socialMediaRepository.GetByIdListAsync(teamMemberDto.SocialMediaIdList ?? new List<int>(), session),
                    PictureList = await pictureRepository.GetPictureListByIdListAsync(teamMemberDto.PictureIdList ?? new List<int>(), session),
                };
            });
        }
    }
}