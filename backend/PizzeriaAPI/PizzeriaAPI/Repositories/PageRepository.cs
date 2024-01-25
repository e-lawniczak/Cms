using NHibernate.SqlCommand;
using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
    public interface IPageRepository : IGenericRepository<Page>
    {
        Task DeleteAsync(int id, ISession session);
    }
    public class PageRepository : GenericRepository<Page>, IPageRepository
    {
        public PageRepository(IEventRepository eventRepository) : base(eventRepository)
        {
        }
        public new async Task<IList<Page>> GetAllAsync(ISession session)
        {
            Page pageAlias = null;
            var result = await session.QueryOver(() => pageAlias)
                 .Where(() => pageAlias.IsDeleted == false)
                 .OrderBy(() => pageAlias.Id).Asc
                   .ListAsync<Page>();
            return result;
        }
        public new async Task<IList<Page>> GetVisibleAsync(ISession session)
        {
            Page pageAlias = null;
            var result = await session.QueryOver(() => pageAlias)
                 .Where(() => pageAlias.IsDeleted == false)
                 .And(() => pageAlias.IsVisible == true)
                 .OrderBy(() => pageAlias.Id).Asc
                   .ListAsync<Page>();
            return result;
        }
        public async Task DeleteAsync(int id, ISession session)
        {
            var entity = await GetByIdAsync(id, session);
            entity.IsDeleted = true;
            entity.PictureList?.Clear();
            await InsertAsync(entity, session);
        }

        public override async Task InsertAsync(Page entity, ISession session)
        {
            entity.CreationDate = DateTime.Now;
            entity.ModificationDate = DateTime.Now;
            await base.InsertAsync(entity, session);
        }

        public override async Task UpdateAsync(Page entity, ISession session)
        {
            entity.ModificationDate = DateTime.Now;
            await base.UpdateAsync(entity, session);
        }
    }
}
