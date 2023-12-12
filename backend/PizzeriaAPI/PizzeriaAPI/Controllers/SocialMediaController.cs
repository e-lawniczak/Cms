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
		public async Task<ActionResult> AddSocialMedia([FromBody] SocialMediaDto socialMediaDto)
		{
			var socialMedia = GetSocialMedia(socialMediaDto);
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await socialMediaRepository.InsertOrUpdateAsync(socialMedia, session);
			});

			return Ok("SocialMedia inserted successfully");
		}


		[HttpGet]
		[Route("/GetAllSocialMediaList")]
		[SwaggerResponse(HttpStatusCode.OK, "SocialMedia List")]
		public async Task<ActionResult<IList<SocialMediaDto>>> GetAllSocialMediaList()
		{
			IList<SocialMediaDto> socialMediaDtoList = null;
			await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
				var socialMediaList = await socialMediaRepository.GetAllAsync(session);
				socialMediaDtoList = socialMediaList.Select(GetSocialMediaDto).ToList();
			});

			return Ok(socialMediaDtoList);
		}

		[HttpGet]
		[Route("/GetVisibleSocialMediaList")]
		[SwaggerResponse(HttpStatusCode.OK, "SocialMedia List")]
		public async Task<ActionResult<IList<SocialMediaDto>>> GetVisibleSocialMediaList()
		{
			IList<SocialMediaDto> socialMediaDtoList = null;
			await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
				var socialMediaList = await socialMediaRepository.GetAllAsync(session);
				socialMediaDtoList = socialMediaList.Where(x => x.IsVisible).Select(GetSocialMediaDto).ToList();
			});

			return Ok(socialMediaDtoList);
		}

		[HttpPatch]
		[Route("/UpdateSocialMedia")]
		[SwaggerResponse(HttpStatusCode.OK, "SocialMedia updated successfully")]
		public async Task<ActionResult> UpdateSocialMedia([FromBody] SocialMediaDto socialMediaDto)
		{
			var socialMedia = GetSocialMedia(socialMediaDto);
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await socialMediaRepository.InsertOrUpdateAsync(socialMedia, session);
			});

			return Ok("SocialMedia updated successfully");
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
				Id = socialMedia?.Id ?? 0,
				Name = socialMedia.Name,
				Link = socialMedia.Link,
				IsMain = socialMedia.IsMain,
				CreateDate = socialMedia.CreateDate,
				ModificationDate = socialMedia.ModificationDate,
				IsVisible = socialMedia.IsVisible,
				PictureIdList = socialMedia.PictureList.Select(x=>x.PictureId).ToList(),
				TeamMemberId = socialMedia.TeamMember.Id
			};
		}
		private SocialMedia GetSocialMedia(SocialMediaDto socialMediaDto)
		{
			return transactionCoordinator.InRollbackScope(session => {
				return new SocialMedia()
				{

					Id = socialMediaDto?.Id ?? 0,
					Name = socialMediaDto.Name,
					Link = socialMediaDto.Link,
					IsMain = socialMediaDto.IsMain ?? false,
					CreateDate = socialMediaDto.CreateDate ?? DateTime.Now,
					ModificationDate = socialMediaDto.ModificationDate ?? DateTime.Now,
					IsVisible = socialMediaDto.IsVisible ?? true,
					IsDeleted = false,
					PictureList = pictureRepository.GetPictureListByIdListAsync(socialMediaDto.PictureIdList ?? new List<int>(), session).Result,
					TeamMember = teamMemberRepository.GetByIdAsync(socialMediaDto.TeamMemberId ?? 0, session).Result

				};
			});
		}
	}
}