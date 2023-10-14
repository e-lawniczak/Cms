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
			var socialMedia = new SocialMedia()
			{
				Name = socialMediaDto.Name
			};
			try
			{
				logger.LogDebug($"Insert socialMedia. Name: {socialMedia.Name}");
				transactionCoordinator.InCommitScope(session => repository.InsertSocialMedia(socialMedia, session));
			}
			catch (Exception ex)
			{
				logger.LogDebug($"Failed to insert socialMedia. Name: {socialMedia.Name}. ", ex);

				throw;
			}
			return Ok();
		}

		[HttpGet(Name = "GetSocialMedia")]
		[SwaggerResponse(HttpStatusCode.OK, "SocialMedia got successfully")]
		[SwaggerResponse(HttpStatusCode.NotFound, "SocialMedia not found")]
		public ActionResult<IEnumerable<SocialMedia>> GetSocialMedia()
		{
			var socialMedia = transactionCoordinator.InRollbackScope(session => repository.GetSocialMedia(session));

			logger.LogDebug($"Send social Media. Size {socialMedia.Count()}");

			var socialMediaDtos = socialMedia.Select(x => new SocialMediaDto()
			{
				Name = x.Name,
			});
			if (socialMediaDtos.IsNullOrEmpty())
				return NotFound("SocialMedia not found");
			return Ok(socialMediaDtos);
		}
	}
}