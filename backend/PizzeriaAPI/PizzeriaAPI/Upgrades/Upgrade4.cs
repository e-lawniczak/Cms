using Microsoft.Extensions.Options;
using PizzeriaAPI.Domain;
using PizzeriaAPI.Security;
using PizzeriaAPI.Settings;

namespace PizzeriaAPI.Upgrades
{
    public class Upgrade4 : IUpgrade
    {
        public int Number => 4;
        private readonly IAuthenticationService authenticationService;
        private readonly HashSettings hashSettings;
        public Upgrade4(IAuthenticationService authenticationService, IOptions<HashSettings> hashSettings)
        {
            this.authenticationService = authenticationService;
            this.hashSettings = hashSettings.Value;
        }
        public void Execute(NHibernate.ISession session)
        {
            AddDefaultUser(session);
        }
        private void AddDefaultUser(NHibernate.ISession session)
        {
            var hashPassword = BCrypt.Net.BCrypt.HashPassword("haslo123", hashSettings.Salt);
            var request = new RegistrationRequest
            {
                Email = "example@gmail.com",
                Password = hashPassword
            };
           var x = authenticationService.RegisterAsync(request).Result;
        }
    }
}
