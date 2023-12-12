using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
	public interface IPageRepository : IGenericRepository<Page>
	{
		Task DeleteAsync(int id, ISession session);
	}
	public class PageRepository : GenericRepository<Page>, IPageRepository
	{
		public async Task DeleteAsync(int id, ISession session)
		{
			var entity = await GetByIdAsync(id, session);
			entity.IsDeleted = true;
			await InsertOrUpdateAsync(entity, session);
		}
	}
}
