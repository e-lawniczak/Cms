namespace PizzeriaAPI.Upgrades
{
    public class Upgrade1 : IUpgrade
    {
        public int Number => 1;

        public void Execute(NHibernate.ISession session)
        {
            string createTableSQL = "CREATE TABLE IF NOT EXISTS UpgradeExecuted (Id INT PRIMARY KEY, UpgradeNumber TEXT)";

            session.CreateSQLQuery(createTableSQL).ExecuteUpdate();
        }
    }
}
