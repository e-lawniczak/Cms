using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.ORM;
using PizzeriaAPI.Repositories;
using System.Security.Claims;

namespace PizzeriaAPI.Security
{
    public class UserManager : IUserManager<User>
	{
		private readonly ILogger<UserManager> logger;
		private readonly IUserRepository userRepository;
		private readonly ITransactionCoordinator transactionCoordinator;
		public UserManager(
			ILogger<UserManager> logger,
			IUserRepository userRepository, 
			ITransactionCoordinator transactionCoordinator)
		{
			this.logger = logger;
			this.userRepository = userRepository;
			this.transactionCoordinator = transactionCoordinator;
		}
		public Task<User?> FindByEmailAsync(string email)
		{
			string toLowerEmail = email.ToLowerInvariant();
			var user = transactionCoordinator.InRollbackScope(session =>
				userRepository.GetUserByEmail(toLowerEmail, session)
			);

			return Task.FromResult(user);
		}

		public Task<List<Claim>> GetClaimsAsync(User user)
		{
			Claim c = new Claim("MyCos", "MyValue");
			var lis = new List<Claim>();
			lis.Add(c);
			return Task.FromResult(lis);
		}

		public Task<List<string>> GetRolesAsync(User user)
		{
			string c = "User";
			var lis = new List<string>();
			lis.Add(c);
			return Task.FromResult(lis);
		}

		public async Task<UserManagerResult> CreateAsync(User user, string password)
		{
			await transactionCoordinator.InCommitScope(async session => {
				await userRepository.InsertOrUpdateAsync(user, session);
			});

			return await Task.FromResult(UserManagerResult.Success);
		}
	}
}
