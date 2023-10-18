using Microsoft.Extensions.Diagnostics.HealthChecks;
using PizzeriaAPI.ORM;

namespace API.HealthChecks
{
	public class DBHealthCheck : IHealthCheck
	{
		private readonly ITransactionCoordinator transactionCoordinator;
		public DBHealthCheck(ITransactionCoordinator transactionCoordinator)
		{
			this.transactionCoordinator = transactionCoordinator;

		}

		public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = new CancellationToken())
		{
			try
			{
				var result = await transactionCoordinator.InRollbackScopeAsync(session => session.CreateSQLQuery("SELECT 1").UniqueResultAsync());
				return HealthCheckResult.Healthy();
			}
			catch (Exception ex)
			{
				return new HealthCheckResult(context.Registration.FailureStatus, exception: ex);
			}
		}
	}
}