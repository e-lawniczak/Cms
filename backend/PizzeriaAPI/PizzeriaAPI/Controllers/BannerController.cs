using Microsoft.AspNetCore.Mvc;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.ORM;
using PizzeriaAPI.Repositories;
using Swashbuckle.Swagger.Annotations;
using System.Net;
using System.Web.Http.Controllers;

namespace PizzeriaAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class BannerController : ControllerBase
	{
		private readonly ILogger<BannerController> logger;
		private readonly ITransactionCoordinator transactionCoordinator;
		private readonly IBannerRepository bannerRepository;
		public BannerController(
			ILogger<BannerController> logger,
			ITransactionCoordinator transactionCoordinator,
			IBannerRepository bannerRepository)
		{
			this.logger = logger;
			this.transactionCoordinator = transactionCoordinator;
			this.bannerRepository = bannerRepository;
		}


		[HttpPost]
		[Route("/AddBanner")]
		[SwaggerResponse(HttpStatusCode.OK, "Banner inserted successfully")]
		public async Task<ActionResult> AddBanner([FromBody] Banner banner)
		{
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await bannerRepository.InsertOrUpdateAsync(banner, session);
			});

			return Ok("Banner inserted successfully");
		}


		[HttpGet]
		[Route("/GetBannerList")]
		[SwaggerResponse(HttpStatusCode.OK, "Banner List")]
		public async Task<ActionResult<IList<Banner>>> GetBanner()
		{
			IList<Banner> bannerList = null;
			await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
				bannerList = await bannerRepository.GetAllAsync(session);
			});

			return Ok(bannerList);
		}
	}
}
