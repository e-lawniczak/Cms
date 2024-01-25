using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories.EntityRepository
{
    public interface IKeyValueRepository : IEntityRepository<KeyValue>
    {
        Task DeleteAsync(int id, ISession session);
        Task<KeyValue> GetByKeyAsync(string key, ISession session);
        Task<IList<KeyValue>> GetAllAsync(ISession session);

    }

    public class KeyValueRepository : EntityRepository<KeyValue>, IKeyValueRepository
    {
        public KeyValueRepository(IEventRepository eventRepository)  : base(eventRepository, Domain.ControllerEnum.KeyValue)
        {
        }
        public async Task<IList<KeyValue>> GetAllAsync(ISession session)
        {
            var result = await session.QueryOver<KeyValue>()
                .OrderBy(x => x.Id).Asc.ListAsync();
            return result;
        }
        public async Task<KeyValue> GetByKeyAsync(string key, ISession session)
        {
            return await session.QueryOver<KeyValue>()
                .Where(x => x.Key == key)
                .SingleOrDefaultAsync();
        }

        public async Task DeleteAsync(int id, ISession session)
        {
            var obj = await session.GetAsync<KeyValue>(id);
            if (obj == null)
                return;
            await session.DeleteAsync(obj);
            await eventRepository.InsertOrUpdate(controllerEnum, Domain.ActionTypeEnum.Delete, obj.Id, 1, session);
        }
    }
}
