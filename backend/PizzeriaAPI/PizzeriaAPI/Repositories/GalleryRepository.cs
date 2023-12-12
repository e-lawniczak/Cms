using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
	public interface IGalleryRepository : IGenericRepository<Gallery>
	{
		Task DeleteAsync(int id, ISession session);
	}
	public class GalleryRepository : GenericRepository<Gallery>, IGalleryRepository
	{
		public async Task DeleteAsync(int id, ISession session)
		{
			var entity = await GetByIdAsync(id, session);
			entity.IsDeleted = true;
			await InsertOrUpdateAsync(entity, session);
		}
	}
}
