using Microsoft.Extensions.Options;
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
        public Upgrade5(IAuthenticationService authenticationService, IOptions<SecuritySettings> securitySettings)
        {
            this.authenticationService = authenticationService;
            this.securitySettings = securitySettings.Value;
        }
        public void Execute(NHibernate.ISession session)
        {
            AddDefaultUser(session);
        }
        private void AddDefaultUser(NHibernate.ISession session)
        {
            var hashPassword = BCrypt.Net.BCrypt.HashPassword("haslo123", securitySettings.Salt);
            var request = new RegistrationRequest
            {
                Email = "example@gmail.com",
                Password = hashPassword
            };
            var x = authenticationService.RegisterAsync(request).Result;
        }
    }
}
