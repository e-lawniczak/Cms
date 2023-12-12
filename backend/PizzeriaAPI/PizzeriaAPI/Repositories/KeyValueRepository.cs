using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
	public interface IKeyValueRepository : IGenericRepository<KeyValue>
	{
		Task DeleteAsync(int id, ISession session);
	}

	public class KeyValueRepository : GenericRepository<KeyValue>, IKeyValueRepository
	{

		public async Task DeleteAsync(int id, ISession session)
		{
			throw new NotImplementedException();
		}
	}
}
