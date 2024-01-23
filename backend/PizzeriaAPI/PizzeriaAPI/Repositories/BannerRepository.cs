using NHibernate.Criterion;
using NHibernate.Linq;
using NHibernate.SqlCommand;
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
            Banner bannerAlias = null;
            var result = await session.QueryOver(() => bannerAlias)
                 .Where(() => bannerAlias.IsDeleted == false)
                 .OrderBy(() => bannerAlias.Id).Asc
                   .ListAsync<Banner>();
            return result.Select(banner =>
            {
                banner.Slider = banner.Slider?.IsDeleted ?? false ? banner.Slider : null;
                return banner;
            }).ToList();
        }
        public new async Task<IList<Banner>> GetVisibleAsync(ISession session)
        {
            Banner bannerAlias = null;
            Slider sliderAlias = null;
            var result = await session.QueryOver(() => bannerAlias)
                 .Where(() => bannerAlias.IsDeleted == false)
                 .And(() => bannerAlias.IsVisible == true)
                 .OrderBy(() => bannerAlias.Id).Asc
                   .ListAsync<Banner>();
            return result.Select(banner =>
            {
                banner.Slider = (!banner.Slider?.IsDeleted ?? false) && (banner.Slider?.IsVisible ?? true) ? banner.Slider : null;
                return banner;
            }).ToList();
        }
        public async Task<Banner> GetBannerByTitleAsync(string bannerTitle, ISession session)
        {
            Banner bannerAlias = null;
            Slider sliderAlias = null;

            var result = await session.QueryOver(() => bannerAlias)
                .JoinAlias(() => bannerAlias.Slider, () => sliderAlias)
                .Where(() => bannerAlias.IsDeleted == false)
                .And(() => sliderAlias.IsDeleted == false)
                .And(() => bannerAlias.Title.Like(bannerTitle))
                .OrderBy(() => bannerAlias.Id).Asc
                .SingleOrDefaultAsync<Banner>();

            return result;
        }
        public async Task<IList<Banner>> GetBannerListByIdListAsync(IList<int> bannerIdList, ISession session)
        {
            Banner bannerAlias = null;
            Slider sliderAlias = null;

            var result = await session.QueryOver(() => bannerAlias)
                .JoinAlias(() => bannerAlias.Slider, () => sliderAlias)
                .Where(() => bannerAlias.IsDeleted == false)
                .And(() => sliderAlias.IsDeleted == false)
                .And(() => bannerAlias.Id.IsIn(bannerIdList.ToArray()))
                .OrderBy(() => bannerAlias.Id).Asc
                .ListAsync<Banner>();

            return result;
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
