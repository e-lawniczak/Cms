﻿namespace PizzeriaAPI.Security
{
	public interface IAuthenticationService
	{
		Task<AuthenticationResponse> LoginAsync(AuthenticationRequest request);
		Task<RegistrationResponse> RegisterAsync(RegistrationRequest request);
	}
}
