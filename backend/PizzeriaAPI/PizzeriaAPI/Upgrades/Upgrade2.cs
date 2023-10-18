using System.Data.Common;

namespace PizzeriaAPI.Upgrades
{
	public class Upgrade2 : IUpgrade
	{
		public int Number => 2;

		public void Execute(NHibernate.ISession session)
		{
			var sql = "CREATE TABLE IF NOT EXISTS SocialMedia (Id INT PRIMARY KEY, Name TEXT)";


			session.CreateSQLQuery(sql).ExecuteUpdate();
		}
	}
}
