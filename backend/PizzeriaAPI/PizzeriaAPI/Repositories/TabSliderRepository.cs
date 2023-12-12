using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
	public interface ITabSliderRepository : IGenericRepository<TabSlider> 
	{
		Task DeleteAsync(int id, ISession session);
	}
	public class TabSliderRepository : GenericRepository<TabSlider>, ITabSliderRepository
	{
		public async Task DeleteAsync(int id, ISession session)
		{
			var entity = await GetByIdAsync(id, session);
			entity.IsDeleted = true;
			await InsertOrUpdateAsync(entity, session);
		}
	}
}
