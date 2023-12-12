using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
	public interface IMenuElementRepository : IGenericRepository<MenuElement>
	{
		Task DeleteAsync(int id, ISession session);
	}
	public class MenuElementRepository : GenericRepository<MenuElement>, IMenuElementRepository
	{
		public async Task DeleteAsync(int id, ISession session)
		{
			var entity = await GetByIdAsync(id, session);
			entity.IsDeleted = true;
			await InsertOrUpdateAsync(entity, session);
		}
	}
}
