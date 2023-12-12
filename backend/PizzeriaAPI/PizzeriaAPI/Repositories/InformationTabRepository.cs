using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
	public interface IInformationTabRepository : IGenericRepository<InformationTab> {
		Task<IList<InformationTab>> GetInformationTabListByIdListAsync(IList<int> InformationTabIdList, ISession session);
		Task DeleteAsync(int id, ISession session);
	}
	public class InformationTabRepository : GenericRepository<InformationTab>, IInformationTabRepository
	{

		public async Task<IList<InformationTab>> GetInformationTabListByIdListAsync(IList<int> InformationTabIdList, ISession session)
		{
			return await session.QueryOver<InformationTab>()
									.WhereRestrictionOn(x => x.InformationTabId).IsIn(InformationTabIdList.ToArray())
									.ListAsync<InformationTab>();
		}
		public async Task DeleteAsync(int id, ISession session)
		{
			var entity = await GetByIdAsync(id, session);
			entity.IsDeleted = true;
			await InsertOrUpdateAsync(entity, session);
		}
	}
}
