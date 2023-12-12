using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PizzeriaAPI.Database.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PizzeriaAPI.Security
{
    public class AuthenticationService : IAuthenticationService
	{
		private IUserManager<User> userManager;
		private readonly JSONWebTokensSettings jwtSettings;

		public AuthenticationService(IUserManager<User> userManager,
			 IOptions<JSONWebTokensSettings> jwtSettings)
		{
			this.userManager = userManager;
			this.jwtSettings = jwtSettings.Value;
		}


		public async Task<AuthenticationResponse> LoginAsync(AuthenticationRequest request)
		{
			var eduUser = await userManager.FindByEmailAsync(request.Email);

			if (eduUser == null)
				throw new Exception("Not found user with given email");
			if (request.Password != eduUser.Password)
				throw new UnauthorizedAccessException("Wrong email or password");
			JwtSecurityToken jwtSecurityToken = await GenerateToken(eduUser);

			AuthenticationResponse response = new AuthenticationResponse
			{
				Id = eduUser.UserId,
				Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken),
				Email = eduUser.Email,
			};

			return response;

		}

		public async Task<RegistrationResponse> RegisterAsync(RegistrationRequest request)
		{
			var existingEmail = await userManager.FindByEmailAsync(request?.Email);

			if (existingEmail == null)
			{
				var user = new User
				{
					Email = request.Email,
					Password = request.Password
				};

				var result = await userManager.CreateAsync(user, request.Password);

				if (result.Succeeded)
				{
					return new RegistrationResponse() { UserId = user.UserId };
				}
				else
				{
					throw new Exception($"{result.Errors}");
				}
			}
			else
			{
				throw new Exception($"Email {request.Email} already exists.");
			}
		}

		private async Task<JwtSecurityToken> GenerateToken(User user)
		{
			var userClaims = await userManager.GetClaimsAsync(user);
			var roles = await userManager.GetRolesAsync(user);

			var roleClaims = new List<Claim>();

			for (int i = 0; i < roles.Count; i++)
			{
				roleClaims.Add(new Claim(ClaimTypes.Role, roles[i]));
			}

			var claims = new[]
			{
			new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
			new Claim(JwtRegisteredClaimNames.Email, user.Email),
			new Claim("uid", user.UserId.ToString()),
			new Claim(ClaimTypes.Role,"adminEdu")
			}
			.Union(userClaims)
			.Union(roleClaims);

			var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Key));
			var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

			var jwtSecurityToken = new JwtSecurityToken(
				issuer: jwtSettings.Issuer,
				audience: jwtSettings.Audience,
				claims: claims,
				expires: DateTime.UtcNow.AddMinutes(jwtSettings.DurationInMinutes),
				signingCredentials: signingCredentials);
			return jwtSecurityToken;
		}
	}
}
