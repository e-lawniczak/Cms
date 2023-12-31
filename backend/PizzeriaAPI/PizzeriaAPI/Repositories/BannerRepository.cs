﻿using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{

	public interface IBannerRepository: IGenericRepository<Banner>
	{
		Task<IList<Banner>> GetBannerListByIdListAsync(IList<int> bannerIdList, ISession session);
		Task DeleteAsync(int id, ISession session);
	}
	public class BannerRepository : GenericRepository<Banner>, IBannerRepository
	{
		public async Task<IList<Banner>> GetBannerListByIdListAsync(IList<int> bannerIdList, ISession session)
		{
			return await session.QueryOver<Banner>()
									.WhereRestrictionOn(x => x.Id).IsIn(bannerIdList.ToArray())
									.ListAsync<Banner>();
		}
		public async Task DeleteAsync(int id, ISession session)
		{
			var entity = await GetByIdAsync(id, session);
			entity.IsDeleted = true;
			await InsertAsync(entity, session);
		}
		public override async Task InsertAsync(Banner entity, ISession session)
		{ 
			entity.CreateDate = DateTime.Now;
			entity.ModificationDate = DateTime.Now;
			await base.InsertAsync(entity, session);
		}

		public override async Task UpdateAsync(Banner entity, ISession session)
		{
			entity.ModificationDate = DateTime.Now;
			await base.UpdateAsync(entity, session);
		}
	}
}
