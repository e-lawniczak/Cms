﻿using NHibernate.Criterion;
using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
	public interface IUserRepository : IGenericRepository<User>
	{
		Task<User> GetUserByEmailAsync(string email, ISession session);
	}
	public class UserRepository : GenericRepository<User>, IUserRepository
	{
		public async Task<User> GetUserByEmailAsync(string email, ISession session)
		{
			return await session.QueryOver<User>().Where(Restrictions.Eq("Email", email)).SingleOrDefaultAsync();
		}
		public override async Task InsertAsync(User entity, ISession session)
		{
			entity.CreateDate = DateTime.Now;
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
