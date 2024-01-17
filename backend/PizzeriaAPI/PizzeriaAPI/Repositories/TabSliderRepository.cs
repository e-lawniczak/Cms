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
			await InsertAsync(entity, session);
		}
		public override async Task InsertAsync(TabSlider entity, ISession session)
		{
			entity.CreateDate = DateTime.Now;
			entity.ModificationDate = DateTime.Now;
			await base.InsertAsync(entity, session);
		}

		public override async Task UpdateAsync(TabSlider entity, ISession session)
		{
			entity.ModificationDate = DateTime.Now;
			await base.UpdateAsync(entity, session);
		}
	}
}
