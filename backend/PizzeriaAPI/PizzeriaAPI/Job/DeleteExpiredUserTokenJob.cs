using PizzeriaAPI.ORM;
using PizzeriaAPI.Repositories;
using Quartz;

namespace PizzeriaAPI.Job
{
	public class DeleteExpiredUserTokenJob : IJob
	{
		private readonly ITransactionCoordinator transactionCoordinator;
		private readonly IUserTokenRepository userTokenRepository;
		public DeleteExpiredUserTokenJob(
			ITransactionCoordinator transactionCoordinator,
			IUserTokenRepository userTokenRepository)
		{
			this.transactionCoordinator = transactionCoordinator;
			this.userTokenRepository = userTokenRepository;
			this.userTokenRepository = userTokenRepository;
		}
		public async Task Execute(IJobExecutionContext context)
		{
			var userTokens = await transactionCoordinator.InRollbackScopeAsync(async session =>
				await userTokenRepository.GetAllAsync(session));
			foreach(var userToken in userTokens)
			{
				if (userToken.ExpireDate < DateTime.Now)
					await transactionCoordinator.InCommitScopeAsync(async session =>
											await userTokenRepository.DeleteAsync(userToken, session));
			}
		}
	}
}
