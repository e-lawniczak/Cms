﻿using Microsoft.AspNetCore.Mvc;
using PizzeriaAPI.Security;

namespace PizzeriaAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AccountController : ControllerBase
	{
		private readonly IAuthenticationService authenticationService;
		public AccountController(IAuthenticationService authenticationService)
		{
			this.authenticationService = authenticationService;
		}

		[HttpPost("login", Name = "Login")]
		public async Task<ActionResult<AuthenticationResponse>> LoginAsync(AuthenticationRequest request)
		{
			return Ok(await authenticationService.LoginAsync(request));
		}

		[HttpPost("register", Name = "Register")]
		public async Task<ActionResult<RegistrationResponse>> RegisterAsync(RegistrationRequest request)
		{
			return Ok(await authenticationService.RegisterAsync(request));
		}
	}
}
