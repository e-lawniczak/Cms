using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Domain;
using PizzeriaAPI.Repositories.EntityRepository;
using System.Linq.Expressions;
using System.Reflection;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories.BaseEntityRepository
{
    public interface IDateEntityRepository<T> where T : DateEntity
    {
        Task InsertAsync(T entity, ISession session);
        Task UpdateAsync(T entity, ISession session);
        Task DeleteAsync(T entity, ISession session);
    }

    public abstract class DateEntityRepository<T> : EntityRepository<T> where T : DateEntity
    {
        public DateEntityRepository(IEventRepository eventRepository, ControllerEnum controllerEnum) : base(eventRepository, controllerEnum)
        {
        }
        public override async Task UpdateAsync(T entity, ISession session)
        {
            if (entity == null)
                return;
            entity.ModificationDate = DateTime.Now;
            await base.UpdateAsync(entity, session);
        }

        public new async Task InsertAsync(T entity, ISession session)
        {
            if (entity == null)
                return;
            entity.CreationDate = DateTime.Now;
            entity.ModificationDate = DateTime.Now;
            await base.InsertAsync(entity, session);

        }

        public new async Task DeleteAsync(T entity, ISession session)
        {
            if (entity == null)
                return;
            entity.ModificationDate = DateTime.Now;
            await base.UpdateAsync(entity, session);
        }
    }
}
