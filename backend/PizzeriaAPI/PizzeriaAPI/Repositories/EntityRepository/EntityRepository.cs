using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Domain;
using ISession = NHibernate.ISession;


namespace PizzeriaAPI.Repositories.EntityRepository
{
    public interface IEntityRepository<T> where T: Entity
    {
        Task InsertAsync(T entity, ISession session);
        Task UpdateAsync(T entity, ISession session);
        Task DeleteAsync(T entity, ISession session);
        Task<T> GetByIdAsync(int id, ISession session);
    }
    public abstract class EntityRepository<T> : IEntityRepository<T> where T: Entity
    {

        protected readonly IEventRepository eventRepository;
        protected readonly ControllerEnum controllerEnum;
        public EntityRepository(IEventRepository eventRepository, ControllerEnum controllerEnum)
        {
            this.eventRepository = eventRepository;
            this.controllerEnum = controllerEnum;
        }
        public async virtual Task<T> GetByIdAsync(int id, ISession session)
        {
            return await session.GetAsync<T>(id);
        }
        public async virtual Task UpdateAsync(T entity, ISession session)
        {
            if (entity == null)
                return;
            await session.UpdateAsync(entity);
            await eventRepository.InsertOrUpdate(controllerEnum, ActionTypeEnum.Edit, entity.Id, 1, session);
        }

        public async virtual Task InsertAsync(T entity, ISession session)
        {
            if (entity == null)
                return;
            await session.SaveAsync(entity);
            await eventRepository.InsertOrUpdate(controllerEnum, ActionTypeEnum.Add, entity.Id, 1, session);

        }
        public async Task DeleteAsync(T entity, ISession session)
        {
            if (entity == null)
                return;
            await session.UpdateAsync(entity, session);
            await eventRepository.InsertOrUpdate(controllerEnum, ActionTypeEnum.Delete, entity.Id, 1, session);
        }
    }
}
