using NHibernate.Criterion;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Domain;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories.EntityWithPictureRepositories
{
    public interface IEntityWithPictureRepository<T> where T : EntityWithPicture
    {
        Task InsertAsync(T entity, ISession session);
        Task UpdateAsync(T entity, ISession session);
        Task<T> GetByIdAsync(int id, ISession session);
        Task<IList<T>> GetAllAsync(ISession session);
        Task<IList<T>> GetVisibleAsync(ISession session);
        Task<IList<T>> GetByIdListAsync(IList<int> idList, ISession session);
        Task DeleteAsync(T entity, ISession session);
    }
    public abstract class EntityWithPictureRepository<T> : IEntityWithPictureRepository<T> where T : EntityWithPicture
    {
        private readonly IEventRepository eventRepository;
        private readonly ControllerEnum controllerEnum;

        public EntityWithPictureRepository(IEventRepository eventRepository, ControllerEnum controllerEnum)
        {
            this.eventRepository = eventRepository;
            this.controllerEnum = controllerEnum;
        }
        public virtual async Task<IList<T>> GetByIdListAsync(IList<int> idList, ISession session)
        {
            return await session.QueryOver<T>()
                .Where(x => x.IsDeleted == false)
                .And(x => x.Id.IsIn(idList.ToArray()))
                .OrderBy(x => x.Id).Asc
                .ListAsync<T>();
        }

        public virtual async Task InsertAsync(T entity, ISession session)
        {
            if (entity == null)
                return;
            entity.ModificationDate = DateTime.Now;
            entity.CreationDate = DateTime.Now;
            await session.SaveAsync(entity);
            await eventRepository.InsertOrUpdate(controllerEnum, ActionTypeEnum.Add, entity.Id, 1, session);
        }

        public virtual async Task UpdateAsync(T entity, ISession session)
        {
            if (entity == null)
                return;
            entity.ModificationDate = DateTime.Now;
            await session.UpdateAsync(entity);
            await eventRepository.InsertOrUpdate(controllerEnum, ActionTypeEnum.Edit, entity.Id, 1, session);
        }

        public virtual async Task DeleteAsync(T entity, ISession session)
        {
            if (entity == null)
                return;
            entity.IsDeleted = true;
            entity.PictureList?.Clear();
            entity.ModificationDate = DateTime.Now;
            await session.UpdateAsync(entity, session);
            await eventRepository.InsertOrUpdate(controllerEnum, ActionTypeEnum.Delete, entity.Id, 1, session);
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
    }
}
