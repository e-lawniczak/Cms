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
			var teamMember = GetTeamMember(teamMemberDto);
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await teamMemberRepository.InsertOrUpdateAsync(teamMember, session);
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
			var teamMember = GetTeamMember(TeamMemberDto);
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await teamMemberRepository.InsertOrUpdateAsync(teamMember, session);
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
				CreateDate = teamMember.CreateDate,
				ModificationDate = teamMember.ModificationDate,
				IsVisible = teamMember.IsVisible,
				PictureIdList = teamMember.PictureList.Select(x => x.PictureId).ToList(),
				FirstName = teamMember.FirstName,
				LastName = teamMember.LastName,
				RoleId = teamMember.Role.RoleId,
				SocialMediaIdList = teamMember.SocialMediaList.Select(x => x.Id).ToList(),
			};
		}
		private TeamMember GetTeamMember(TeamMemberDto teamMemberDto)
		{
			return transactionCoordinator.InRollbackScope(session => {
				return new TeamMember()
				{

					Id = teamMemberDto.Id ?? 0,
					CreateDate = teamMemberDto.CreateDate ?? DateTime.Now,
					ModificationDate = teamMemberDto.ModificationDate ?? DateTime.Now,
					IsVisible = teamMemberDto.IsVisible ?? true,
					FirstName = teamMemberDto.FirstName,
					LastName = teamMemberDto.LastName,
					IsDeleted = false,
					Role = roleRepository.GetByIdAsync(teamMemberDto.RoleId?? 0, session).Result,
					SocialMediaList = socialMediaRepository.GetSocialMediaListByIdListAsync(teamMemberDto.SocialMediaIdList ?? new List<int>(), session).Result,
					PictureList = pictureRepository.GetPictureListByIdListAsync(teamMemberDto.PictureIdList ?? new List<int>(), session).Result,
				};
			});
		}
	}
}