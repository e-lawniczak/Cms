using NHibernate.Criterion;
using NHibernate.Linq;
using NHibernate.SqlCommand;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Repositories.EntityRepository;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories.ExtendedBaseEntityRepositories
{
    public interface ISliderRepository : IExtendedDateEntityRepository<Slider>
    {
        Task DeleteAsync(int id, ISession session);
        Task<Slider> GetSliderByNameAsync(string name, ISession session);

    }
    public class SliderRepository : ExtendedDateEntityRepository<Slider>, ISliderRepository
    {
        public SliderRepository(IEventRepository eventRepository) : base(eventRepository, Domain.ControllerEnum.Slider)
        {
        }
        public new async Task<IList<Slider>> GetAllAsync(ISession session)
        {
            var result = await base.GetAllAsync(session);
            return result.Select(slider =>
            {
                slider.BannerList = slider.BannerList?.Where(banner => !banner?.IsDeleted ?? false).ToList();
                return slider;
            }).ToList();
        }
        public new async Task<IList<Slider>> GetVisibleAsync(ISession session)
        {
            var result = await base.GetVisibleAsync(session);
            return result.Select(slider =>
            {
                slider.BannerList = slider.BannerList?.Where(banner => (!banner?.IsDeleted ?? false) && (banner?.IsVisible ?? true)).ToList();
                return slider;
            }).ToList();
        }
        public async Task<Slider> GetSliderByNameAsync(string name, ISession session)
        {
            var result = await session.QueryOver<Slider>()
                 .Where(x => x.IsDeleted == false)
                 .And(x => x.Name.IsLike(name))
                 .OrderBy(x => x.Id).Asc
                   .SingleOrDefaultAsync<Slider>();
            result.BannerList = result.BannerList?.Where(banner => !banner?.IsDeleted ?? false).ToList();
            return result;
        }
        public async Task DeleteAsync(int id, ISession session)
        {
            var entity = await GetByIdAsync(id, session);
            entity.BannerList?.Clear();
            await base.DeleteAsync(entity, session);
        }
    }
}
