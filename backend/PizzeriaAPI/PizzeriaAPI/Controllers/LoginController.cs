using Microsoft.AspNetCore.Mvc;
using PizzeriaAPI.Security;

namespace PizzeriaAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class LoginController : ControllerBase
	{
		private readonly IAuthenticationService authenticationService;
		public LoginController(IAuthenticationService authenticationService)
		{
			this.authenticationService = authenticationService;
		}

		[HttpPost("authenticate", Name = "Authenticate")]
		public async Task<ActionResult<AuthenticationResponse>> AuthenticateAsync(AuthenticationRequest request)
		{
			return Ok(await authenticationService.AuthenticateAsync(request));
		}

		[HttpPost("register", Name = "Register")]
		public async Task<ActionResult<RegistrationResponse>> RegisterAsync(RegistrationRequest request)
		{
			return Ok(await authenticationService.RegisterAsync(request));
		}
	}
}
