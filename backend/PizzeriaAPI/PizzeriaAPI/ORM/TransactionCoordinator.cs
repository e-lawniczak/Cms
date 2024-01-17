using NHibernate;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.ORM
{
	public interface ITransactionCoordinator
	{
		Task<T> InRollbackScopeAsync<T>(Func<ISession, Task<T>> action);
		Task InRollbackScopeAsync(Func<ISession, Task> action);
		T InRollbackScope<T>(Func<ISession, T> action);
		void InRollbackScope<T>(Action<ISession> action);
		void InCommitScope(Action<ISession> action);
		T InCommitScope<T>(Func<ISession, T> action);
		Task<T> InCommitScopeAsync<T>(Func<ISession, Task<T>> action);
		Task InCommitScopeAsync(Func<ISession, Task> action);
	}

	public class TransactionCoordinator : ITransactionCoordinator
	{
		private INHibernateHelper nHibernateHelper;
		private ISession session;
		private ITransaction transaction;
		private ILogger<TransactionCoordinator> logger;

		public TransactionCoordinator(
			INHibernateHelper nHibernateHelper,
			ILogger<TransactionCoordinator> logger)
		{
			this.nHibernateHelper = nHibernateHelper;
			this.logger = logger;
		}


		public async Task<T> InRollbackScopeAsync<T>(Func<ISession, Task<T>> action)
		{
			T? result;
			try
			{
				session = nHibernateHelper.OpenSession();
				transaction = session.BeginTransaction();
				result = await action(session);
			}
			catch
			{
				throw;
			}
			finally
			{
				transaction?.Rollback();
				session?.Close();
			}
			return result;
		}
		public async Task InRollbackScopeAsync(Func<ISession, Task> action)
		{
			try
			{
				session = nHibernateHelper.OpenSession();
				transaction = session.BeginTransaction();
				await action(session);
			}
			catch
			{
				throw;
			}
			finally
			{
				await transaction?.RollbackAsync();
				transaction.Dispose();
				session?.Close();
				session.Dispose();
			}
		}

		public T InRollbackScope<T>(Func<ISession, T> action)
		{
			T? result;
			try
			{
				session = nHibernateHelper.OpenSession();
				transaction = session.BeginTransaction();
				result = action(session);
			}
			catch
			{
				throw;
			}
			finally
			{
				transaction?.Rollback();
				session?.Close();
			}
			return result;
		}

		public void InRollbackScope<T>(Action<ISession> action)
		{
			try
			{
				session = nHibernateHelper.OpenSession();
				transaction = session.BeginTransaction();
				action(session);
			}
			catch
			{
				throw;
			}
			finally
			{
				transaction?.Rollback();
				session?.Close();
			}
		}
		public void InCommitScope(Action<ISession> action)
		{
			try
			{
				session = nHibernateHelper.OpenSession();
				transaction = session.BeginTransaction();
				action(session);
				transaction.Commit();
			}
			catch
			{
				transaction?.Rollback();
				throw;
			}
			finally
			{
				session?.Close();
			}
		}
		public T InCommitScope<T>(Func<ISession, T> action)
		{
			T? result;
			try
			{
				session = nHibernateHelper.OpenSession();
				transaction = session.BeginTransaction();
				result = action(session);
				transaction.Commit();
			}
			catch
			{
				transaction?.Rollback();
				throw;
			}
			finally
			{
				session?.Close();
			}
			return result;
		}

		public async Task<T> InCommitScopeAsync<T>(Func<ISession, Task<T>> action)
		{
			T? result;
			try
			{
				session = nHibernateHelper.OpenSession();
				transaction = session.BeginTransaction();
				result = await action(session);
				await transaction.CommitAsync();
			}
			catch
			{
				await transaction?.RollbackAsync();
				transaction?.Dispose();
				throw;
			}
			finally
			{
				session?.Close();
				session?.Dispose();
			}
			return result;
		}
		public async Task InCommitScopeAsync(Func<ISession, Task> action)
		{
			try
			{
				session = nHibernateHelper.OpenSession();
				transaction = session.BeginTransaction();
				action(session);
				await transaction.CommitAsync();
			}
			catch
			{
				await transaction?.RollbackAsync();
				transaction?.Dispose();
				throw;
			}
			finally
			{
				session?.Close();
				session?.Dispose();
			}
		}
	}
}
