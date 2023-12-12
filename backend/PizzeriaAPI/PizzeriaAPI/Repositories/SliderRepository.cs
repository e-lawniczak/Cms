using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
	public interface ISliderRepository : IGenericRepository<Slider>
	{ 
		Task DeleteAsync(int id, ISession session);
	}
	public class SliderRepository : GenericRepository<Slider>, ISliderRepository
	{
		public async Task DeleteAsync(int id, ISession session)
		{
			var entity = await GetByIdAsync(id, session);
			entity.IsDeleted = true;
			await InsertOrUpdateAsync(entity, session);
		}
	}
}
