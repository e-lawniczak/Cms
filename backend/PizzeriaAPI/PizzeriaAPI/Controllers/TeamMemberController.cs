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
		[SwaggerResponse(HttpStatusCode.OK, "TeamMember inserted successfully")]
		public async Task<ActionResult> AddTeamMember([FromBody] TeamMemberDto teamMemberDto)
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
			IList<TeamMemberDto> teamMemberDtoList = null;
			await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
				var TeamMemberList = await teamMemberRepository.GetAllAsync(session);
				teamMemberDtoList = TeamMemberList.Select(GetTeamMemberDto).ToList();
			});

			return Ok(teamMemberDtoList);
		}

		[HttpGet]
		[Route("/GetVisibleTeamMemberList")]
		[SwaggerResponse(HttpStatusCode.OK, "TeamMember List")]
		public async Task<ActionResult<IList<TeamMemberDto>>> GetVisibleTeamMemberList()
		{
			IList<TeamMemberDto> teamMemberDtoList = null;
			await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
				var teamMemberList = await teamMemberRepository.GetAllAsync(session);
				teamMemberDtoList = teamMemberList.Where(x => x.IsVisible).Select(GetTeamMemberDto).ToList();
			});

			return Ok(teamMemberDtoList);
		}

		[HttpPatch]
		[Route("/UpdateTeamMember")]
		[SwaggerResponse(HttpStatusCode.OK, "TeamMember updated successfully")]
		public async Task<ActionResult> UpdateTeamMember([FromBody] TeamMemberDto TeamMemberDto)
		{
			var teamMember = await GetTeamMember(TeamMemberDto);
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await teamMemberRepository.UpdateAsync(teamMember, session);
			});

			return Ok("TeamMember updated successfully");
		}
		[HttpDelete]
		[Route("/DeleteTeamMember/{teamMemberId}")]
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
				PictureIdList = teamMember.PictureList.Select(x => x.PictureId).ToList(),
				FirstName = teamMember.FirstName,
				LastName = teamMember.LastName,
				RoleId = teamMember.Role.RoleId,
				SocialMediaIdList = teamMember.SocialMediaList.Select(x => x.Id).ToList(),
			};
		}
		private async Task<TeamMember> GetTeamMember(TeamMemberDto teamMemberDto)
		{
			return await transactionCoordinator.InRollbackScopeAsync( async session =>
			{
				return new TeamMember()
				{

					Id = teamMemberDto.Id ?? 0,
					IsVisible = teamMemberDto.IsVisible ?? true,
					FirstName = teamMemberDto.FirstName,
					LastName = teamMemberDto.LastName,
					IsDeleted = false,
					Role = await roleRepository.GetByIdAsync(teamMemberDto.RoleId ?? 0, session),
					SocialMediaList = await socialMediaRepository.GetSocialMediaListByIdListAsync(teamMemberDto.SocialMediaIdList ?? new List<int>(), session),
					PictureList = await pictureRepository.GetPictureListByIdListAsync(teamMemberDto.PictureIdList ?? new List<int>(), session),
				};
			});
		}
	}
}