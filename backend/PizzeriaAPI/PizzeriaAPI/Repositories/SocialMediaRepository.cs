using MySqlX.XDevAPI;
using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;


namespace PizzeriaAPI.Repositories
{
	public interface ISocialMediaRepository
	{
		IEnumerable<SocialMedia> GetSocialMedia(ISession session);

		void InsertSocialMedia(SocialMedia socialMedia, ISession session);
	}
	public class SocialMediaRepository : ISocialMediaRepository
	{
		public IEnumerable<SocialMedia> GetSocialMedia(ISession session)
		{
			return session.QueryOver<SocialMedia>().List();
		}

		public void InsertSocialMedia(SocialMedia socialMedia, ISession session)
		{
			session.SaveOrUpdate(socialMedia);
		}
	}
}
