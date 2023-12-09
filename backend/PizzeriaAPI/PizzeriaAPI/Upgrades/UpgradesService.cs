using Microsoft.IdentityModel.Tokens;
using PizzeriaAPI.Controllers;
using PizzeriaAPI.Database.Entities;
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
			foreach (var upgrade in GetUpgradesToExecute())
			{
				logger.LogDebug($"Executing upgrade number: {upgrade.Number}");
				try
				{
					transactionCoordinator.InCommitScope(session =>
					{
						upgrade.Execute(session);
						session.SaveOrUpdate(new UpgradeExecuted() { UpgradeNumber = upgrade.Number });
					});
					logger.LogDebug($"Successfully executed Upgrade {upgrade.Number}");
				}
				catch (Exception ex)
				{
					logger.LogError($"Error while executing Upgrade{upgrade.Number}. Message: {ex.Message}. StackTrace: {ex.StackTrace}");
					throw;
				}
			}
		}
		private List<IUpgrade> GetUpgradesToExecute()
		{
			IEnumerable<int> upgradesExecuted = null;
			try
			{
				var upgradesExecuted1 = transactionCoordinator.InRollbackScope(session =>
					session.QueryOver<UpgradeExecuted>().List());
				upgradesExecuted = upgradesExecuted1.Select(x => x.UpgradeNumber);
			}
			catch { }
			if (upgradesExecuted.IsNullOrEmpty())
				return upgrades.OrderBy(x=>x.Number).ToList();

			return upgrades.Where(x=> !upgradesExecuted.Any(y=>y == x.Number)).OrderBy(x=>x.Number).ToList();
		}
	}
}
