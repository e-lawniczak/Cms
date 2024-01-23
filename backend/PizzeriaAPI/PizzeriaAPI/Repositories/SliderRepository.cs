using NHibernate.Criterion;
using NHibernate.Linq;
using NHibernate.SqlCommand;
using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
    public interface ISliderRepository : IGenericRepository<Slider>
    {
        Task DeleteAsync(int id, ISession session);
        Task<Slider> GetSliderByNameAsync(string name, ISession session);

    }
    public class SliderRepository : GenericRepository<Slider>, ISliderRepository
    {
        public new async Task<IList<Slider>> GetAllAsync(ISession session)
        {
            Slider sliderAlias = null;
            var result = await session.QueryOver(() => sliderAlias)
                 .Where(() => sliderAlias.IsDeleted == false)
                 .OrderBy(() => sliderAlias.SliderId).Asc
                   .ListAsync<Slider>();
            return result.Select(slider =>
            {
                slider.BannerList = slider.BannerList?.Where(banner => !banner.IsDeleted).ToList();
                return slider;
            }).ToList();
        }
        public new async Task<IList<Slider>> GetVisibleAsync(ISession session)
        {
            Slider sliderAlias = null;
            var result = await session.QueryOver(() => sliderAlias)
                 .Where(() => sliderAlias.IsDeleted == false)
                 .And(() => sliderAlias.IsVisible == true)
                 .OrderBy(() => sliderAlias.SliderId).Asc
                   .ListAsync<Slider>();
            return result.Select(slider =>
            {
                slider.BannerList = slider.BannerList?.Where(banner => !banner.IsDeleted && banner.IsVisible).ToList();
                return slider;
            }).ToList();
        }
        public async Task<Slider> GetSliderByNameAsync(string name, ISession session)
        {
            Slider sliderAlias = null;
            var result = await session.QueryOver(() => sliderAlias)
                 .Where(() => sliderAlias.IsDeleted == false)
                 .And(() => sliderAlias.Name.Like(name))
                 .OrderBy(() => sliderAlias.SliderId).Asc
                   .SingleOrDefaultAsync<Slider>();
            result.BannerList = result.BannerList?.Where( banner=> !banner.IsDeleted).ToList();
            return result;
        }
        public async Task DeleteAsync(int id, ISession session)
        {
            var entity = await GetByIdAsync(id, session);
            entity.IsDeleted = true;
            entity.BannerList?.Clear();
            await UpdateAsync(entity, session);
        }

        public override async Task InsertAsync(Slider entity, ISession session)
        {
            entity.CreationDate = DateTime.Now;
            entity.ModificationDate = DateTime.Now;
            await base.InsertAsync(entity, session);
        }

        public override async Task UpdateAsync(Slider entity, ISession session)
        {
            entity.ModificationDate = DateTime.Now;
            await base.UpdateAsync(entity, session);
        }
    }
}
