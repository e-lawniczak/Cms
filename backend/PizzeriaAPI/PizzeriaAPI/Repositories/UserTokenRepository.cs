using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
	public interface IUserTokenRepository : IGenericRepository<UserToken>
	{
		Task DeleteAsync(UserToken entity, ISession session);
	}
	public class UserTokenRepository : GenericRepository<UserToken>, IUserTokenRepository
	{
		public async Task DeleteAsync(UserToken entity, ISession session)
		{
			await session.DeleteAsync(entity);
		}

	}
}
