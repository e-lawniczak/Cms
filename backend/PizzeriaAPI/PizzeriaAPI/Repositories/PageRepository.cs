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
			await InsertAsync(entity, session);
		}

		public override async Task InsertAsync(Page entity, ISession session)
		{
			entity.CreateDate = DateTime.Now;
			entity.ModificationDate = DateTime.Now;
			await base.InsertAsync(entity, session);
		}

		public override async Task UpdateAsync(Page entity, ISession session)
		{
			entity.ModificationDate = DateTime.Now;
			await base.UpdateAsync(entity, session);
		}
	}
}
