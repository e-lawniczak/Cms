using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PizzeriaAPI.Domain;
using PizzeriaAPI.Repositories;
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
        [HttpPost]
        [Route("/ChangePassword")]
        [Authorize]
        public async Task<ActionResult> ChangePassword([FromBody] ChangePasswordRequest changePasswordRequest)
        {
            var userToken = Request.Headers["Authorization"].ToString().Split(" ")[1];
            await authenticationService.ChangePasswordAsync(userToken, changePasswordRequest);
            return Ok("Successfully changed Password");
        }

        [HttpPost]
        [Route("/ForgotPassword")]
        public async Task<ActionResult> ForgotPassword([FromBody] ForgotPasswordRequest resetPasswordRequest)
        {
            return Ok(await authenticationService.ForgotPasswordAsync(resetPasswordRequest));
        }
        [HttpPost]
        [Route("/ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest resetPasswordRequest)
        {
            await authenticationService.ResetPasswordAsync(resetPasswordRequest);
            return Ok("Successfully reseted password");
        }
    }
}
