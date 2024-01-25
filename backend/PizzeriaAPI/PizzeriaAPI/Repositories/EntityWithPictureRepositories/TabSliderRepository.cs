using NHibernate.Criterion;
using NHibernate.Linq;
using NHibernate.SqlCommand;
using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories.EntityWithPictureRepositories
{
    public interface ITabSliderRepository : IEntityWithPictureRepository<TabSlider>
    {
        Task DeleteAsync(int id, ISession session);
        Task<TabSlider> GetTabSliderByTitleAsync(string sliderTitle, ISession session);
    }
    public class TabSliderRepository : EntityWithPictureRepository<TabSlider>, ITabSliderRepository
    {
        public TabSliderRepository(IEventRepository eventRepository) : base(eventRepository, Domain.ControllerEnum.TabSlider)
        {
        }
        public override async Task<IList<TabSlider>> GetAllAsync(ISession session)
        {
            var result = await base.GetAllAsync(session);

            return result.Select(tabSlider =>
            {
                tabSlider.InformationTabList = tabSlider.InformationTabList?.Where(informationTab => !informationTab?.IsDeleted ?? false).ToList();
                return tabSlider;
            }).ToList();
        }
        public override async Task<IList<TabSlider>> GetVisibleAsync(ISession session)
        {
            var result = await base.GetVisibleAsync(session);

            return result.Select(tabSlider =>
            {
                tabSlider.InformationTabList = tabSlider.InformationTabList?.Where(informationTab => (!informationTab?.IsDeleted ?? false) && (informationTab?.IsVisible ?? true)).ToList();
                return tabSlider;
            }).ToList();
        }
        public async Task<TabSlider> GetTabSliderByTitleAsync(string sliderTitle, ISession session)
        {
            var result = await session.QueryOver<TabSlider>()
                 .Where(x => x.IsDeleted == false)
                 .And(x => x.Title.IsLike(sliderTitle))
                 .OrderBy(x => x.Id).Asc
                 .SingleOrDefaultAsync<TabSlider>();

            result.InformationTabList = result.InformationTabList?.Where(informationTab => !informationTab?.IsDeleted ?? false).ToList();
            return result;
        }
        public async Task DeleteAsync(int id, ISession session)
        {
            var entity = await GetByIdAsync(id, session);
            if (entity == null)
                return;
            entity.InformationTabList?.Clear();
            await base.DeleteAsync(entity, session);
        }
    }
}
