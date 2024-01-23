using NHibernate.Criterion;
using NHibernate.SqlCommand;
using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
    public interface IInformationTabRepository : IGenericRepository<InformationTab>
    {
        Task<IList<InformationTab>> GetInformationTabListByIdListAsync(IList<int> InformationTabIdList, ISession session);
        Task DeleteAsync(int id, ISession session);
    }
    public class InformationTabRepository : GenericRepository<InformationTab>, IInformationTabRepository
    {

        public new async Task<IList<InformationTab>> GetAllAsync(ISession session)
        {
            InformationTab informationTabAlias = null;
            var result = await session.QueryOver(() => informationTabAlias)
                 .Where(() => informationTabAlias.IsDeleted == false)
                 .OrderBy(() => informationTabAlias.InformationTabId).Asc
                   .ListAsync<InformationTab>();
            return result.Select(informationTab =>
            {
                informationTab.TabSlider = (!informationTab.TabSlider?.IsDeleted ?? false) ? informationTab.TabSlider : null;
                return informationTab;
            }).ToList(); ;
        }
        public new async Task<IList<InformationTab>> GetVisibleAsync(ISession session)
        {
            InformationTab informationTabAlias = null;
            var result = await session.QueryOver(() => informationTabAlias)
                 .Where(() => informationTabAlias.IsDeleted == false)
                 .And(() => informationTabAlias.IsVisible == true)
                 .OrderBy(() => informationTabAlias.InformationTabId).Asc
                   .ListAsync<InformationTab>();
            return result.Select(informationTab =>
            {
                informationTab.TabSlider = (!informationTab.TabSlider?.IsDeleted ?? false) &&
                (informationTab.TabSlider?.IsVisible ?? true)? informationTab.TabSlider : null;
                return informationTab;
            }).ToList(); ;
        }
        public async Task<IList<InformationTab>> GetInformationTabListByIdListAsync(IList<int> InformationTabIdList, ISession session)
        {
            InformationTab informationTabAlias = null;

            var result = await session.QueryOver(() => informationTabAlias)
                .Where(() => informationTabAlias.IsDeleted == false)
                .And(() => informationTabAlias.InformationTabId.IsIn(InformationTabIdList.ToArray()))
                .OrderBy(() => informationTabAlias.InformationTabId).Asc
                .ListAsync<InformationTab>();

            return result.Select(informationTab =>
            {
                informationTab.TabSlider = (informationTab.TabSlider?.IsDeleted ?? false) ? informationTab.TabSlider : null;
                return informationTab;
            }).ToList(); ;
        }
        public async Task DeleteAsync(int id, ISession session)
        {
            var entity = await GetByIdAsync(id, session);
            entity.IsDeleted = true;
            entity.TabSlider = null;
            await UpdateAsync(entity, session);
        }

        public override async Task InsertAsync(InformationTab entity, ISession session)
        {
            entity.CreationDate = DateTime.Now;
            entity.ModificationDate = DateTime.Now;
            await base.InsertAsync(entity, session);
        }

        public override async Task UpdateAsync(InformationTab entity, ISession session)
        {
            entity.ModificationDate = DateTime.Now;
            await base.UpdateAsync(entity, session);
        }
    }
}
