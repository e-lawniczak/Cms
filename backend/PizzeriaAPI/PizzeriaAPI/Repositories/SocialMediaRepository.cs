using MySqlX.XDevAPI;
using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;


namespace PizzeriaAPI.Repositories
{
	public interface ISocialMediaRepository : IGenericRepository<SocialMedia>
	{
		Task<IList<SocialMedia>> GetSocialMediaListByIdListAsync(IList<int> socialMediaIdList, ISession session);
		Task DeleteAsync(int id, ISession session);
	}
	public class SocialMediaRepository : GenericRepository<SocialMedia>, ISocialMediaRepository
	{
		public async Task<IList<SocialMedia>> GetSocialMediaListByIdListAsync(IList<int> socialMediaIdList, ISession session)
		{
			return await session.QueryOver<SocialMedia>()
									.WhereRestrictionOn(x => x.Id).IsIn(socialMediaIdList.ToArray())
									.ListAsync<SocialMedia>();
		}
		public async Task DeleteAsync(int id, ISession session)
		{
			var entity = await GetByIdAsync(id, session);
			entity.IsDeleted = true;
			await InsertAsync(entity, session);
		}
		public override async Task InsertAsync(SocialMedia entity, ISession session)
		{
			entity.CreateDate = DateTime.Now;
			entity.ModificationDate = DateTime.Now;
			await base.InsertAsync(entity, session);
		}

		public override async Task UpdateAsync(SocialMedia entity, ISession session)
		{
			entity.ModificationDate = DateTime.Now;
			await base.UpdateAsync(entity, session);
		}
	}
}
