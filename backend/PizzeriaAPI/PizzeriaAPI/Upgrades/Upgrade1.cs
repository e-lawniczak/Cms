using Microsoft.Data.SqlClient;
using System.Data.Common;

namespace PizzeriaAPI.Upgrades
{
	public class Upgrade1 : IUpgrade
	{
		public int Number => 1;

		public void Execute(NHibernate.ISession session)
		{
			string createTableSQL = "CREATE TABLE UpgradeExecuted (Id NUMBER(10) PRIMARY KEY, UpgradeNumber VARCHAR2(255))";

			using (DbCommand command = session.Connection.CreateCommand())
			{
				command.CommandText = createTableSQL;
				command.ExecuteNonQuery();
			}
		}
	}
}
