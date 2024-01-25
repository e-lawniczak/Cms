using NHibernate.Criterion;
using NHibernate.Linq;
using NHibernate.SqlCommand;
using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
    public interface ITabSliderRepository : IGenericRepository<TabSlider>
    {
        Task DeleteAsync(int id, ISession session);
        Task<TabSlider> GetTabSliderByTitleAsync(string sliderTitle, ISession session);
    }
    public class TabSliderRepository : GenericRepository<TabSlider>, ITabSliderRepository
    {
        public TabSliderRepository(IEventRepository eventRepository) : base(eventRepository)
        {
        }
        public new async Task<IList<TabSlider>> GetAllAsync(ISession session)
        {
            TabSlider tabSliderAlias = null;
            var result = await session.QueryOver(() => tabSliderAlias)
                 .Where(() => tabSliderAlias.IsDeleted == false)
                 .OrderBy(() => tabSliderAlias.Id).Asc
                 .ListAsync<TabSlider>();

            return result.Select(tabSlider =>
            {
                tabSlider.InformationTabList = tabSlider.InformationTabList?.Where(informationTab => !informationTab.IsDeleted).ToList();
                return tabSlider;
            }).ToList();
        }
        public new async Task<IList<TabSlider>> GetVisibleAsync(ISession session)
        {
            TabSlider tabSliderAlias = null;
            var result = await session.QueryOver(() => tabSliderAlias)
                 .Where(() => tabSliderAlias.IsDeleted == false)
                 .And(() => tabSliderAlias.IsVisible == true)
                 .OrderBy(() => tabSliderAlias.Id).Asc
                 .ListAsync<TabSlider>();

            return result.Select(tabSlider =>
            {
                tabSlider.InformationTabList = tabSlider.InformationTabList?.Where(informationTab => !informationTab.IsDeleted && informationTab.IsVisible).ToList();
                return tabSlider;
            }).ToList();
        }
        public async Task<TabSlider> GetTabSliderByTitleAsync(string sliderTitle, ISession session)
        {
            TabSlider tabSliderAlias = null;
            var result = await session.QueryOver(() => tabSliderAlias)
                 .Where(() => tabSliderAlias.IsDeleted == false)
                 .And(() => tabSliderAlias.Title.IsLike(sliderTitle))
                 .OrderBy(() => tabSliderAlias.Id).Asc
                 .SingleOrDefaultAsync<TabSlider>();

            result.InformationTabList = result.InformationTabList?.Where(informationTab => !informationTab.IsDeleted).ToList();
            return result;
        }
        public async Task DeleteAsync(int id, ISession session)
        {
            var entity = await GetByIdAsync(id, session);
            entity.IsDeleted = true;
            entity.PictureList?.Clear();
            entity.InformationTabList?.Clear();
            await UpdateAsync(entity, session);
        }
        public override async Task InsertAsync(TabSlider entity, ISession session)
        {
            entity.CreationDate = DateTime.Now;
            entity.ModificationDate = DateTime.Now;
            await base.InsertAsync(entity, session);
        }

        public override async Task UpdateAsync(TabSlider entity, ISession session)
        {
            entity.ModificationDate = DateTime.Now;
            await base.UpdateAsync(entity, session);
        }
    }
}
