using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PizzeriaAPI.Domain;
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
        [Route("/ResetPassword")]
        [Obsolete]
        public async Task<ActionResult> ResetPassword([FromBody] ResetPasswordRequest resetPasswordRequest)
        {
            return Ok(await authenticationService.ResetPasswordAsync(resetPasswordRequest));
        }
    }
}
