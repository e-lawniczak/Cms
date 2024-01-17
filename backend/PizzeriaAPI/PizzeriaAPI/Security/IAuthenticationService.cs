using PizzeriaAPI.Domain;

namespace PizzeriaAPI.Security
{
	public interface IAuthenticationService
	{
		Task<AuthenticationResponse> LoginAsync(AuthenticationRequest request);
		Task<RegistrationResponse> RegisterAsync(RegistrationRequest request);
		Task<ChangePasswordResponse> ChangePasswordAsync(ChangePasswordRequest changePasswordRequest);
		Task<ResetPasswordResponse> ResetPasswordAsync(ResetPasswordRequest resetPasswordRequest);
	}
}
