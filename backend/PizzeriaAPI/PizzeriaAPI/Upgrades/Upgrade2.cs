using System.Data.Common;

namespace PizzeriaAPI.Upgrades
{
	public class Upgrade2 : IUpgrade
	{
		public int Number => 2;

		public void Execute(NHibernate.ISession session)
		{
			var sql = "CREATE TABLE SocialMedia (Id NUMBER(10) PRIMARY KEY, Name VARCHAR2(255))";


			using (DbCommand command = session.Connection.CreateCommand())
			{
				command.CommandText = sql;
				command.ExecuteNonQuery();
			}
		}
	}
}
