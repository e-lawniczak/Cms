using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.ORM;
using PizzeriaAPI.Repositories;
using PizzeriaAPI.Upgrades;

namespace PizzeriaAPI
{
	public static class ModuleInitialize
	{
		public static void AddServices(this IServiceCollection services)
		{
			services.AddSingleton<INHibernateHelper, NHibernateHelper>();
			services.AddSingleton<ITransactionCoordinator, TransactionCoordinator>();

			services.AddSingleton<ISocialMediaRepository, SocialMediaRepository>();


			services.AddSingleton<IUpgradesService, UpgradesService>();

			services.AddSingleton<IUpgrade, Upgrade1>();
			services.AddSingleton<IUpgrade, Upgrade2>();
		}

		public static void OnInitialize(this IServiceProvider services)
		{
			var upgradeService = services.GetRequiredService<IUpgradesService>();

			upgradeService.UpgradeServices();
		}
	}
}
