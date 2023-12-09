using NHibernate;
using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
	public interface IGenericRepository<T> where T : class
	{
		Task InsertOrUpdateAsync(T entity, ISession session);
		Task<T> GetByIdAsync(int id, ISession session);
		Task<IList<T>> GetAllAsync(ISession session);
	}

	public abstract class GenericRepository<T> : IGenericRepository<T> where T : class
	{
		public async Task<IList<T>> GetAllAsync(ISession session)
		{
			return await session.QueryOver<T>().ListAsync();
		}

		public async Task<T> GetByIdAsync(int id, ISession session)
		{
			return await session.GetAsync<T>(id);
		}

		public async Task InsertOrUpdateAsync(T entity, ISession session)
		{
			await session.SaveOrUpdateAsync(entity);
		}
	}
}
