using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
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
	public class SocialMediaController : ControllerBase
	{

		private readonly ILogger<SocialMediaController> logger;
		private readonly ITransactionCoordinator transactionCoordinator;
		private readonly ISocialMediaRepository repository;
		public SocialMediaController(ILogger<SocialMediaController> logger,
			ITransactionCoordinator transactionCoordinator,
			ISocialMediaRepository repository)
		{
			this.logger = logger;
			this.transactionCoordinator = transactionCoordinator;
			this.repository = repository;
		}

		[HttpPost]
		[Route("/AddSocialMedia")]
		[SwaggerResponse(HttpStatusCode.OK, "SocialMedia inserted successfully")]
		public ActionResult AddSocialMedia([FromBody] SocialMediaDto socialMediaDto)
		{
			try
			{
				var socialMedia = new SocialMedia()
				{
					Name = socialMediaDto.Name
				};
				logger.LogDebug($"Insert socialMedia. Name: {socialMedia.Name}");
				transactionCoordinator.InCommitScope(session => repository.InsertSocialMedia(socialMedia, session));
				return Ok();

			}
			catch (Exception ex)
			{
				logger.LogDebug($"Failed to insert socialMedia. Name: {socialMediaDto.Name}. ", ex);

				return StatusCode(500, ex.Message);
			}
		}

		[HttpGet(Name = "GetSocialMedia")]
		[SwaggerResponse(HttpStatusCode.OK, "SocialMedia got successfully")]
		[SwaggerResponse(HttpStatusCode.NotFound, "SocialMedia not found")]
		public ActionResult<IEnumerable<SocialMedia>> GetSocialMedia()
		{
			try
			{
				IEnumerable<SocialMedia> socialMedia;
				socialMedia = transactionCoordinator.InRollbackScope(session => repository.GetSocialMedia(session));

				logger.LogDebug($"Send social Media. Size {socialMedia.Count()}");

				var socialMediaDtos = socialMedia.Select(x => new SocialMediaDto()
				{
					Name = x.Name,
				});
				if (socialMediaDtos.IsNullOrEmpty())
					return NotFound("SocialMedia not found");
				return Ok(socialMediaDtos);
			}
			catch (Exception ex)
			{
				logger.LogError("Failed to fetch social media", ex);
				return StatusCode(500,ex.Message);
			}
		}
	}
}