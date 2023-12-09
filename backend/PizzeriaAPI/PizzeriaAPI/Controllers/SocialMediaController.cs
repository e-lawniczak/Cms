using Microsoft.IdentityModel.Tokens;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.ORM;
using PizzeriaAPI.Repositories;
using Swashbuckle.Swagger.Annotations;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Microsoft.AspNetCore.Authorization;

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
		public ActionResult AddSocialMedia([FromBody] SocialMedia socialMedia)
		{
			try
			{
				logger.LogDebug($"Insert socialMedia. Name: {socialMedia.Name}");
				transactionCoordinator.InCommitScope(session => repository.InsertOrUpdateAsync(socialMedia, session));
				return Ok();

			}
			catch (Exception ex)
			{
				logger.LogDebug($"Failed to insert socialMedia. Name: {socialMedia.Name}.  Message: {ex.Message}. StackTrace: {ex.StackTrace}");

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
				IEnumerable<SocialMedia> socialMediaList;
				socialMediaList = transactionCoordinator.InRollbackScope(session => repository.GetAllAsync(session).Result);

				logger.LogDebug($"Send social Media. Size {socialMediaList.Count()}");

				if (socialMediaList.IsNullOrEmpty())
					return NotFound("SocialMedia not found");
				return Ok(socialMediaList);
			}
			catch (Exception ex)
			{
				logger.LogError($"Failed to fetch social media.  Message: {ex.Message}. StackTrace: {ex.StackTrace}");
				return StatusCode(500,ex.Message);
			}
		}
	}
}