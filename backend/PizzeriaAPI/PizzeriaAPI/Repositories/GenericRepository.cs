using System.Linq.Expressions;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
	public interface IGenericRepository<T> where T : class
	{
		Task InsertAsync(T entity, ISession session);
		Task UpdateAsync(T entity, ISession session);
		Task<T> GetByIdAsync(int id, ISession session);
		Task<IList<T>> GetAllAsync(ISession session);
	}

	public abstract class GenericRepository<T> : IGenericRepository<T> where T : class
	{
		public async Task<IList<T>> GetAllAsync(ISession session)
		{
			return await session.QueryOver<T>().Where(CreateColumnFalsePredicate("IsDeleted")).ListAsync();
		}

		public async Task<T> GetByIdAsync(int id, ISession session)
		{
			return await session.GetAsync<T>(id);
		}
		public async virtual Task UpdateAsync(T entity, ISession session)
		{
			await session.UpdateAsync(entity);
		}

		public async virtual Task InsertAsync(T entity, ISession session)
		{
			await session.SaveAsync(entity);
		}
		private Expression<Func<T, bool>> CreateColumnFalsePredicate(string columnName)
		{
			var parameter = Expression.Parameter(typeof(T), "x");
			var property = Expression.PropertyOrField(parameter, columnName);
			var constantFalse = Expression.Constant(false);
			var body = Expression.Equal(property, constantFalse);
			return Expression.Lambda<Func<T, bool>>(body, parameter);

		}
	}
}
