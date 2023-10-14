using PizzeriaAPI.Controllers;
using PizzeriaAPI.ORM;

namespace PizzeriaAPI.Upgrades
{
	public interface IUpgradesService
	{
		void UpgradeServices();
	}
	public class UpgradesService : IUpgradesService
	{
		private readonly ILogger<UpgradesService> logger;
		private readonly ITransactionCoordinator transactionCoordinator;
		private readonly IEnumerable<IUpgrade> upgrades;
		public UpgradesService(ILogger<UpgradesService> logger,
			ITransactionCoordinator transactionCoordinator,
			IEnumerable<IUpgrade> upgrades)
		{
			this.logger = logger;
			this.transactionCoordinator = transactionCoordinator;
			this.upgrades = upgrades;
		}


		public void UpgradeServices()
		{
			foreach (var upgrade in upgrades.OrderBy(x => x.Number))
			{
				logger.LogDebug($"Executing upgrade number: {upgrade.Number}");
				transactionCoordinator.InCommitScope(session => upgrade.Execute(session));
				logger.LogDebug($"Successfully executed Upgrade {upgrade.Number}");
			}
		}
	}
}
