using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using ISession = NHibernate.ISession;
using NHibernate.Tool.hbm2ddl;
using System.Reflection;

namespace PizzeriaAPI.ORM
{
	public interface INHibernateHelper
	{
		ISession OpenSession();
		void CloseSession(ISession session);
		void CloseSessionFactory();
	}
	public class NHibernateHelper : INHibernateHelper
	{
		private ISessionFactory sessionFactory;
		public NHibernateHelper()
		{
			sessionFactory = FluentConfigure();
		}

		public ISession OpenSession()
		{
			return sessionFactory.OpenSession();
		}
		public void CloseSession(ISession session)
		{
			session.Close();
		}
		public void CloseSessionFactory()
		{
			sessionFactory.Close();
		}
		private ISessionFactory FluentConfigure()
		{
			return Fluently.Configure()
				.Database(GetDatabaseConfiguration)
				.Mappings(m =>
					m.FluentMappings.AddFromAssembly(Assembly.GetExecutingAssembly()))
				.ExposeConfiguration(cfg => new SchemaExport(cfg))
				.Cache(
					c => c.UseQueryCache()
					.UseSecondLevelCache()
					.ProviderClass<NHibernate.Cache.HashtableCacheProvider>())
				.BuildSessionFactory();
		}
		private IPersistenceConfigurer GetDatabaseConfiguration()
		{
			return PostgreSQLConfiguration.Standard.ConnectionString(c => {
				c.Host("127.0.0.1");
				c.Database("CMSDatabase");
				c.Port(5432);
				c.Username("CMSUser");
				c.Password("CMSPassword");
			});
		}
	}
}
