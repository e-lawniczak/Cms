using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Upgrades
{
	public class Upgrade1 : IUpgrade
	{
		public int Number => 1;

		public void Execute(ISession session)
		{
			string sql = "@\"CREATE TABLE IF NOT EXISTS SocialMedia " +
				"( " +
					"Id NOT NULL, " +
					"Name Text NOT NULL, " +
					"PRIMARY KEY (Id) " +
				");";
			session.CreateSQLQuery(sql).ExecuteUpdate();
		}
	}
}
