using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Domain;
using PizzeriaAPI.ORM;
using PizzeriaAPI.Repositories;
using System.Security.Claims;

namespace PizzeriaAPI.Security
{
    public class UserManager : IUserManager<User>
    {
        private readonly ILogger<UserManager> logger;
        private readonly IUserRepository userRepository;
        private readonly IUserTokenRepository userTokenRepository;
        private readonly ITransactionCoordinator transactionCoordinator;
        public UserManager(
            ILogger<UserManager> logger,
            IUserRepository userRepository,
            ITransactionCoordinator transactionCoordinator,
            IUserTokenRepository userTokenRepository)
        {
            this.logger = logger;
            this.userRepository = userRepository;
            this.transactionCoordinator = transactionCoordinator;
            this.userTokenRepository = userTokenRepository;
        }
        public async Task<User> FindByEmailAsync(string email)
        {
            string toLowerEmail = email.ToLowerInvariant();
            var user = await transactionCoordinator.InRollbackScopeAsync(async session =>
                await userRepository.GetUserByEmailAsync(toLowerEmail, session)
            );

            return user;
        }

        public Task<List<Claim>> GetClaimsAsync(User user)
        {
            var lis = new List<Claim>
            {
                 new Claim("MyCos", "MyValue")
            };
            return Task.FromResult(lis);
        }

        public Task<List<string>> GetRolesAsync(User user)
        {
            var lis = new List<string>
            {
                "Admin"
            };
            return Task.FromResult(lis);
        }

        public async Task<UserManagerResult> CreateAsync(User user, string password)
        {
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await userRepository.InsertAsync(user, session);
            });

            return await Task.FromResult(UserManagerResult.Success);
        }
        public async Task<UserManagerResult> UpdateAsync(User user)
        {
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await userRepository.UpdateAsync(user, session);
            });
            return await Task.FromResult(UserManagerResult.Success);
        }
        public async Task<string> SaveTokenAsync(User user, string token)
        {
            var userToken = new UserToken()
            {
                User = user,
                Token = token,
                ExpireDate = DateTime.Now.AddMinutes(60)
            };

            await transactionCoordinator.InCommitScopeAsync(async session =>
            {

                await userTokenRepository.InsertAsync(userToken, session);
            }
                );
            return token;
        }
    }
}
