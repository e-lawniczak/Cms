using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Crypto.Generators;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Domain;
using PizzeriaAPI.Settings;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PizzeriaAPI.Security
{
	public class AuthenticationService : IAuthenticationService
	{
		private IUserManager<User> userManager;
		private IEmailSender emailSender;
		private readonly JSONWebTokensSettings jwtSettings;
		private readonly HashSettings hashSettings;

		public AuthenticationService(IUserManager<User> userManager,
			IEmailSender emailSender,
			 IOptions<JSONWebTokensSettings> jwtSettings,
			 IOptions<HashSettings> hashSettings)
		{
			this.userManager = userManager;
			this.jwtSettings = jwtSettings.Value;
			this.emailSender = emailSender;
			this.hashSettings = hashSettings.Value;
		}

		public async Task<ResetPasswordResponse> ResetPasswordAsync(ResetPasswordRequest resetPasswordRequest)
		{
			var user = await userManager.FindByEmailAsync(resetPasswordRequest.Email);
			if (user == null)
				throw new Exception("Not found user with given email");

			var message = await CreateMessage(user);
			await emailSender.SendEmailAsync(resetPasswordRequest.Email, "Reset password", message);

			return new ResetPasswordResponse() { Message = "Sended mail successfully" };
		}


		public async Task<ChangePasswordResponse> ChangePasswordAsync(ChangePasswordRequest changePasswordRequest)
		{
			var user = await userManager.FindByEmailAsync(changePasswordRequest.Email);
			if (user == null)
				throw new Exception("Not found user with given email");
			if (changePasswordRequest.Password != changePasswordRequest.ConfirmPassword)
				throw new Exception("Passwords are not the same");

			var hashPassword = BCrypt.Net.BCrypt.HashPassword(changePasswordRequest.Password);

			if (hashPassword != user.Password)
				throw new Exception("Password is invalid");

			user.Password = hashPassword;
			var result = await userManager.UpdateAsync(user);

			if (result.Succeeded)
			{
				return new ChangePasswordResponse() { UserId = user.UserId };
			}
			else
			{
				throw new Exception($"{result.Errors}");
			}
		}
		public async Task<AuthenticationResponse> LoginAsync(AuthenticationRequest request)
		{
			var eduUser = await userManager.FindByEmailAsync(request.Email);

			if (eduUser == null)
				throw new Exception("Not found user with given email");
			var hash = BCrypt.Net.BCrypt.HashPassword(request.Password, hashSettings.Salt);
			if(hash != eduUser.Password)
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
				var hashPassword = BCrypt.Net.BCrypt.HashPassword(request.Password, hashSettings.Salt);
				var user = new User
				{
					Email = request.Email,
					Password = hashPassword
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

		private async Task<string> CreateMessage(User user)
		{
			var generatedRandomNumber = GenerateRandomNumber();
			var userToken = await userManager.SaveTokenAsync(user, generatedRandomNumber.ToString());
			return $"Your reset password code is: {userToken}";

		}

		private int GenerateRandomNumber()
		{
			var random = new Random();
			return random.Next(100000, 999999);
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
