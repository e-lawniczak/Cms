namespace PizzeriaAPI.Security
{
	public interface IAuthenticationService
	{
		Task<AuthenticationResponse> AuthenticateAsync(AuthenticationRequest request);
		Task<RegistrationResponse> RegisterAsync(RegistrationRequest request);
	}
}
