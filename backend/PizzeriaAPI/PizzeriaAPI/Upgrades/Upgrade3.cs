namespace PizzeriaAPI.Upgrades
{
	public class Upgrade3 : IUpgrade
	{
		public int Number => 3;

		public void Execute(NHibernate.ISession session)
		{
			CreateTableUserToken(session);
		}
		private void CreateTableUserToken(NHibernate.ISession session)
		{
			var sql = $"CREATE TABLE UserToken" +
				$"(" +
					"USERTOKENID INT PRIMARY KEY, " +
					"USERID INTEGER NOT NULL, " +
					"TOKEN VARCHAR(255) NOT NULL, " +
					"EXPIREDATE TIMESTAMP NOT NULL, " +
					"FOREIGN KEY(USERID) REFERENCES \"User\"(USERID)" +
				");";

			session.CreateSQLQuery(sql).ExecuteUpdate();
		}
	}
}
