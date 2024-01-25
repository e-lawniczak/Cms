using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
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
        private readonly IUserManager<User> userManager;
        private readonly IEmailSender emailSender;
        private readonly SecuritySettings securitySettings;
        private readonly UrlSettings urlSettings;

        public AuthenticationService(IUserManager<User> userManager,
            IEmailSender emailSender,
             IOptions<SecuritySettings> securitySettings,
             IOptions<UrlSettings> urlSettings)
        {
            this.userManager = userManager;
            this.securitySettings = securitySettings.Value;
            this.emailSender = emailSender;
            this.urlSettings = urlSettings.Value;
        }

        public async Task<ResetPasswordResponse> ResetPasswordAsync(ResetPasswordRequest resetPasswordRequest)
        {
            var user = await userManager.GetUserByTokenAsync(resetPasswordRequest.ResetToken);
            if (user == null)
                throw new Exception("Not found user with given token");

            if (resetPasswordRequest.Password != resetPasswordRequest.ConfirmPassword)
                throw new Exception("Passwords are not the same");

            var hashPassword = BCrypt.Net.BCrypt.HashPassword(resetPasswordRequest.Password, securitySettings.Salt);

            user.Password = hashPassword;
            var result = await userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return new ResetPasswordResponse() { UserId = user.Id };
            }
            else
            {
                throw new Exception($"{result.Errors}");
            }
        }
        public async Task<ForgotPasswordResponse> ForgotPasswordAsync(ForgotPasswordRequest resetPasswordRequest)
        {
            var user = await userManager.FindByEmailAsync(resetPasswordRequest.Email);
            if (user == null)
                throw new Exception("Not found user with given email");

            var token = await GenerateForgotPasswordToken(user);
            var resetLink = $"{urlSettings.FrontAdminBaseUrl}/ResetPassword?token={token}";
            var emailBody = $"Click the following link to reset your password: {resetLink}";
            await emailSender.SendEmailAsync(resetPasswordRequest.Email, "Reset password", emailBody);

            return new ForgotPasswordResponse() { Message = "Sended mail successfully" };
        }


        public async Task<ChangePasswordResponse> ChangePasswordAsync(string userToken, ChangePasswordRequest changePasswordRequest)
        {
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(userToken) as JwtSecurityToken;
            string? email = jsonToken.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Email)?.Value;

            if(email == null)
                throw new Exception("Not found email in token");

            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
                throw new Exception("Not found user with given email");

            if (changePasswordRequest.Password != changePasswordRequest.ConfirmPassword)
                throw new Exception("Passwords are not the same");

            var hashPassword = BCrypt.Net.BCrypt.HashPassword(changePasswordRequest.Password, securitySettings.Salt);

            user.Password = hashPassword;
            var result = await userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return new ChangePasswordResponse() { UserId = user.Id };
            }
            else
            {
                throw new Exception($"{result.Errors}");
            }
        }
        public async Task<AuthenticationResponse> LoginAsync(AuthenticationRequest request)
        {
            var eduUser = await userManager.FindByEmailAsync(request?.Email ?? "");

            if (eduUser == null)
                throw new Exception("Not found user with given email");
            var hash = BCrypt.Net.BCrypt.HashPassword(request?.Password, securitySettings.Salt);
            if (hash != eduUser.Password)
                throw new UnauthorizedAccessException("Wrong email or password");
            JwtSecurityToken jwtSecurityToken = await GenerateToken(eduUser);

            AuthenticationResponse response = new AuthenticationResponse
            {
                Id = eduUser.Id,
                Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken),
                Email = eduUser.Email,
            };

            return response;

        }

        public async Task<RegistrationResponse> RegisterAsync(RegistrationRequest request)
        {
            if (request == null)
                throw new Exception("Request is null");
            var existingEmail = await userManager.FindByEmailAsync(request?.Email ?? "");

            if (existingEmail == null)
            {
                var hashPassword = BCrypt.Net.BCrypt.HashPassword(request?.Password, securitySettings.Salt);
                var user = new User
                {
                    Email = request?.Email,
                    Password = hashPassword
                };

                var result = await userManager.CreateAsync(user, request?.Password ?? "");

                if (result.Succeeded)
                {
                    return new RegistrationResponse() { UserId = user.Id };
                }
                else
                {
                    throw new Exception($"{result.Errors}");
                }
            }
            else
            {
                throw new Exception($"Email {request?.Email} already exists.");
            }
        }

        private async Task<string> GenerateForgotPasswordToken(User user)
        {
            var token = Guid.NewGuid().ToString();
            await userManager.SaveTokenAsync(user, token);
            return token;

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
            new Claim(JwtRegisteredClaimNames.Email, user?.Email??""),
            new Claim("uid", user?.Id.ToString()??""),
            new Claim(ClaimTypes.Role,"adminEdu")
            }
            .Union(userClaims)
            .Union(roleClaims);

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securitySettings?.Key ?? ""));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var jwtSecurityToken = new JwtSecurityToken(
                issuer: securitySettings?.Issuer,
                audience: securitySettings?.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(securitySettings.DurationInMinutes),
                signingCredentials: signingCredentials);
            return jwtSecurityToken;
        }
    }
}
