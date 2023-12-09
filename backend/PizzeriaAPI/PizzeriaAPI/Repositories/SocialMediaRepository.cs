using MySqlX.XDevAPI;
using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;


namespace PizzeriaAPI.Repositories
{
	public interface ISocialMediaRepository : IGenericRepository<SocialMedia>
	{
	}
	public class SocialMediaRepository : GenericRepository<SocialMedia>, ISocialMediaRepository
	{
	}
}
