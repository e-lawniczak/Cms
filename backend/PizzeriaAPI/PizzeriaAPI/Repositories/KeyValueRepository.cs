using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
    public interface IKeyValueRepository : IGenericRepository<KeyValue>
    {
        Task DeleteAsync(int id, ISession session);
        Task<KeyValue> GetByKeyAsync(string key, ISession session);

    }

    public class KeyValueRepository : GenericRepository<KeyValue>, IKeyValueRepository
    {
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
        }
    }
}
