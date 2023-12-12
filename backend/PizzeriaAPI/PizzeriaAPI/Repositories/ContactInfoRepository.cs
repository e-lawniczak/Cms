using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
	public interface IContactInfoRepository : IGenericRepository<ContactInfo> 
	{ 
		Task DeleteAsync(int id, ISession session);
	}
	public class ContactInfoRepository : GenericRepository<ContactInfo>, IContactInfoRepository
	{
		public async Task DeleteAsync(int id, ISession session)
		{
			var entity = await GetByIdAsync(id, session);
			entity.IsDeleted = true;
			await InsertOrUpdateAsync(entity, session);
		}
	}
}
