using NHibernate.Criterion;
using NHibernate.SqlCommand;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Domain;
using PizzeriaAPI.Repositories.BaseEntityRepository;
using PizzeriaAPI.Repositories.EntityRepository;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories.ExtendedBaseEntityRepositories
{
    public interface IExtendedDateEntityRepository<T> : IDateEntityRepository<T> where T : ExtendedDateEntity
    {
        Task<T> GetByIdAsync(int id, ISession session);
        Task<IList<T>> GetAllAsync(ISession session);
        Task<IList<T>> GetVisibleAsync(ISession session);
        Task<IList<T>> GetByIdListAsync(IList<int> idList, ISession session);

    }
    public abstract class ExtendedDateEntityRepository<T> : DateEntityRepository<T> where T : ExtendedDateEntity
    {
        public ExtendedDateEntityRepository(IEventRepository eventRepository, ControllerEnum controllerEnum) : base(eventRepository, controllerEnum)
        {
        }
        public virtual async Task<IList<T>> GetByIdListAsync(IList<int> idList, ISession session)
        {
            return await session.QueryOver<T>()
                .Where(x => x.IsDeleted == false)
                .And(x => x.Id.IsIn(idList.ToArray()))
                .OrderBy(x => x.Id).Asc
                .ListAsync<T>();
        }
        public virtual async Task<T> GetByIdAsync(int id, ISession session)
        {
            return await session.GetAsync<T>(id);
        }
        public virtual async Task<IList<T>> GetAllAsync(ISession session)
        {
            var result = await session.QueryOver<T>()
                .Where(x => x.IsDeleted == false)
                .OrderBy(x => x.Id).Asc
                .ListAsync<T>();

            return result;
        }
        public virtual async Task<IList<T>> GetVisibleAsync(ISession session)
        {
            var result = await session.QueryOver<T>()
                 .Where(x => x.IsDeleted == false)
                 .And(x => x.IsVisible == true)
                 .OrderBy(x => x.Id).Asc
                 .ListAsync<T>();

            return result;
        }

        public new virtual async Task DeleteAsync(T entity, ISession session)
        {
            if (entity == null)
                return;
            entity.IsDeleted = true;
            await base.DeleteAsync(entity, session);
        }
    }
}
