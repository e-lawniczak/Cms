using NHibernate;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.ORM
{
	public interface ITransactionCoordinator
	{
		T InRollbackScope<T>(Func<ISession, T> action);
		void InRollbackScope<T>(Action<ISession> action);
		void InCommitScope(Action<ISession> action);
		T InCommitScope<T>(Func<ISession, T> action);
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
		public T InRollbackScope<T>(Func<ISession, T> action)
		{
			T? result;
			try
			{
				session = nHibernateHelper.OpenSession();
				transaction = session.BeginTransaction();
				result = action(session);
			}
			catch (Exception ex)
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
			catch (Exception ex)
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
			catch(Exception ex)
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
			catch (Exception ex)
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
	}
}
