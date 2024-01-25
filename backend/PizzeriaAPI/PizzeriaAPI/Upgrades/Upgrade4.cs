using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Domain;

namespace PizzeriaAPI.Upgrades
{
    public class Upgrade4 : IUpgrade
    {
        public int Number => 4;

        public void Execute(NHibernate.ISession session)
        {
            FillControllerTable(session);
            FillActionTypeTable(session);
        }
        private void FillActionTypeTable(NHibernate.ISession session)
        {
            var count = session.QueryOver<ActionType>().RowCount();
            if (count > 0) return;
            foreach (var actionType in Enum.GetValues<ActionTypeEnum>())
            {
                var sql = $"INSERT INTO ActionType (ActionTypeId, Type) VALUES ({(int)actionType}, '{actionType}');";
                session.CreateSQLQuery(sql).ExecuteUpdate();
            }
        }

        private void FillControllerTable(NHibernate.ISession session)
        {
            var count = session.QueryOver<Controller>().RowCount();
            if (count > 0) return;
            foreach (var controller in Enum.GetValues<ControllerEnum>())
            {
                var sql = $"INSERT INTO Controller (ControllerId, Name) VALUES ({(int)controller}, '{controller}');";
                session.CreateSQLQuery(sql).ExecuteUpdate();
            }
        }
    }
}
