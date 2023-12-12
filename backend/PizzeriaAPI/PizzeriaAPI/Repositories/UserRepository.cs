using NHibernate.Criterion;
using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
    public interface IUserRepository : IGenericRepository<User>
	{
		User GetUserByEmail(string email, ISession session);
	}
	public class UserRepository : GenericRepository<User>, IUserRepository
	{
		public User GetUserByEmail(string email, ISession session)
		{
			return session.QueryOver<User>().Where(Restrictions.Eq("Email", email)).SingleOrDefault();
		}
		public override async Task InsertAsync(User entity, ISession session)
		{
			entity.CreationDate = DateTime.Now;
			entity.ModificationDate = DateTime.Now;
			await base.InsertAsync(entity, session);
		}

		public override async Task UpdateAsync(User entity, ISession session)
		{
			entity.ModificationDate = DateTime.Now;
			await base.UpdateAsync(entity, session);
		}
	}
}
