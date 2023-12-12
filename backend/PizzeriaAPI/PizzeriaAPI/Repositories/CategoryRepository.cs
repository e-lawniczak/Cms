using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
	public interface ICategoryRepository : IGenericRepository<Category>
	{
		Task DeleteAsync(int id, ISession session);
	}
	public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
	{
		public async Task DeleteAsync(int id, ISession session)
		{
			var entity = await GetByIdAsync(id, session);
			entity.IsDeleted = true;
			await InsertOrUpdateAsync(entity, session);
		}
	}
}
