using NHibernate.Criterion;
using NHibernate.SqlCommand;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Repositories.EntityRepository;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories.ExtendedBaseEntityRepositories
{
    public interface IInformationTabRepository : IExtendedDateEntityRepository<InformationTab>
    {
        Task<IList<InformationTab>> GetInformationTabListByIdListAsync(IList<int> InformationTabIdList, ISession session);
        Task DeleteAsync(int id, ISession session);
    }
    public class InformationTabRepository : ExtendedDateEntityRepository<InformationTab>, IInformationTabRepository
    {
        public InformationTabRepository(IEventRepository eventRepository) : base(eventRepository, Domain.ControllerEnum.InformationTab)
        {
        }

        public new async Task<IList<InformationTab>> GetAllAsync(ISession session)
        {
            var result = await base.GetAllAsync(session);
            return result.Select(informationTab =>
            {
                informationTab.TabSlider = !informationTab.TabSlider?.IsDeleted ?? false ? informationTab.TabSlider : null;
                return informationTab;
            }).ToList(); ;
        }
        public new async Task<IList<InformationTab>> GetVisibleAsync(ISession session)
        {
            var result = await base.GetVisibleAsync(session);
            return result.Select(informationTab =>
            {
                informationTab.TabSlider = (!informationTab.TabSlider?.IsDeleted ?? false) &&
                (informationTab.TabSlider?.IsVisible ?? true) ? informationTab.TabSlider : null;
                return informationTab;
            }).ToList(); ;
        }
        public async Task<IList<InformationTab>> GetInformationTabListByIdListAsync(IList<int> informationTabIdList, ISession session)
        {
            var result = await base.GetByIdListAsync(informationTabIdList, session);

            return result.Select(informationTab =>
            {
                informationTab.TabSlider = !informationTab.TabSlider?.IsDeleted ?? false ? informationTab.TabSlider : null;
                return informationTab;
            }).ToList(); ;
        }
        public async Task DeleteAsync(int id, ISession session)
        {
            var entity = await GetByIdAsync(id, session);
            if (entity == null)
                return;
            entity.TabSlider = null;
            await base.UpdateAsync(entity, session);
        }
    }
}
