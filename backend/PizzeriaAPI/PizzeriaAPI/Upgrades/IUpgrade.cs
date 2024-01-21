using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Upgrades
{
    public interface IUpgrade
    {
        int Number { get; }
        void Execute(ISession session);
    }
}
