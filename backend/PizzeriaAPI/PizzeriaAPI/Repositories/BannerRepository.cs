using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{

    public interface IBannerRepository : IGenericRepository<Banner>
    {
        Task<IList<Banner>> GetBannerListByIdListAsync(IList<int> bannerIdList, ISession session);
        Task DeleteAsync(int id, ISession session);
        Task<Banner> GetBannerByTitleAsync(string bannerTitle, ISession session);

    }
    public class BannerRepository : GenericRepository<Banner>, IBannerRepository
    {
        public new async Task<IList<Banner>> GetAllAsync(ISession session)
        {
            var bannerList = await base.GetAllAsync(session);
            return bannerList.OrderBy(x => x.Id).ToList();
        }
        public async Task<Banner> GetBannerByTitleAsync(string bannerTitle, ISession session)
        {
            return await session.QueryOver<Banner>()
                .Where(x => x.Title == bannerTitle)
                .SingleOrDefaultAsync();
        }
        public async Task<IList<Banner>> GetBannerListByIdListAsync(IList<int> bannerIdList, ISession session)
        {
            return await session.QueryOver<Banner>()
                                    .WhereRestrictionOn(x => x.Id).IsIn(bannerIdList.ToArray())
                                    .OrderBy(x => x.Id).Asc
                                    .ListAsync<Banner>();
        }
        public async Task DeleteAsync(int id, ISession session)
        {
            var entity = await GetByIdAsync(id, session);
            entity.IsDeleted = true; 
            entity.PictureList?.Clear();
            await UpdateAsync(entity, session);
        }
        public override async Task InsertAsync(Banner entity, ISession session)
        {
            entity.CreationDate = DateTime.Now;
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
