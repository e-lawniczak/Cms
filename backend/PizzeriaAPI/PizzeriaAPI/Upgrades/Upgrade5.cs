using Microsoft.Extensions.Options;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Domain;
using PizzeriaAPI.Security;
using PizzeriaAPI.Settings;

namespace PizzeriaAPI.Upgrades
{
    public class Upgrade5 : IUpgrade
    {
        public int Number => 5;
        private readonly IAuthenticationService authenticationService;
        private readonly SecuritySettings securitySettings;
        private readonly IUserManager<User> userManager;
        public Upgrade5(IAuthenticationService authenticationService,IUserManager<User> userManager, IOptions<SecuritySettings> securitySettings)
        {
            this.authenticationService = authenticationService;
            this.securitySettings = securitySettings.Value;
            this.userManager = userManager;
        }
        public void Execute(NHibernate.ISession session)
        {
            AddDefaultUser(session);
        }
        private void AddDefaultUser(NHibernate.ISession session)
        {
            var email = "example@gmail.com";
            var password = "haslo123";
            var user = userManager.FindByEmailAsync(email);
            if (user != null) return;

            var hashPassword = BCrypt.Net.BCrypt.HashPassword(password, securitySettings.Salt);
            var request = new RegistrationRequest
            {
                Email = email,
                Password = hashPassword
            };
            
                authenticationService.RegisterAsync(request).Wait();
            
        }
    }
}
