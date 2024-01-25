using NHibernate.Criterion;
using NHibernate.Linq;
using NHibernate.SqlCommand;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Repositories.EntityRepository;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories.EntityWithPictureRepositories
{

    public interface IBannerRepository : IEntityWithPictureRepository<Banner>
    {
        Task DeleteAsync(int id, ISession session);
        Task<Banner> GetBannerByTitleAsync(string bannerTitle, ISession session);

    }
    public class BannerRepository : EntityWithPictureRepository<Banner>, IBannerRepository
    {
        public BannerRepository(IEventRepository eventRepository) : base(eventRepository, Domain.ControllerEnum.Banner)
        {
        }
        public override async Task<IList<Banner>> GetAllAsync(ISession session)
        {
            var result = await base.GetAllAsync(session);
            return result.Select(banner =>
            {
                banner.Slider = !banner.Slider?.IsDeleted ?? false ? banner.Slider : null;
                return banner;
            }).ToList();
        }
        public override async Task<IList<Banner>> GetVisibleAsync(ISession session)
        {
            var result = await base.GetVisibleAsync(session);
            return result.Select(banner =>
            {
                banner.Slider = (!banner.Slider?.IsDeleted ?? false) && (banner.Slider?.IsVisible ?? true) ? banner.Slider : null;
                return banner;
            }).ToList();
        }
        public async Task<Banner> GetBannerByTitleAsync(string bannerTitle, ISession session)
        {
            var result = await session.QueryOver<Banner>()
                 .Where(x => x.IsDeleted == false)
                 .And(x => x.Title == bannerTitle)
                 .SingleOrDefaultAsync();

            result.Slider = !result.Slider?.IsDeleted ?? false ? result.Slider : null;
            return result;
        }
        public override async Task<IList<Banner>> GetByIdListAsync(IList<int> bannerIdList, ISession session)
        {
            var result = await base.GetByIdListAsync(bannerIdList, session);
            return result.Select(banner =>
            {
                banner.Slider = !banner.Slider?.IsDeleted ?? false ? banner.Slider : null;
                return banner;
            }).ToList();
        }
        public async Task DeleteAsync(int id, ISession session)
        {
            var entity = await GetByIdAsync(id, session);

            if (entity == null)
                return;
            entity.Slider = null;
            await base.DeleteAsync(entity, session);
        }
    }
}
