using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
    public interface IMenuElementRepository : IGenericRepository<MenuElement>
    {
        Task DeleteAsync(int id, ISession session);
    }
    public class MenuElementRepository : GenericRepository<MenuElement>, IMenuElementRepository
    {
        public async Task DeleteAsync(int id, ISession session)
        {
            var entity = await GetByIdAsync(id, session);
            entity.IsDeleted = true;
            await InsertAsync(entity, session);
        }

        public override async Task InsertAsync(MenuElement entity, ISession session)
        {
            entity.CreationDate = DateTime.Now;
            entity.ModificationDate = DateTime.Now;
            await base.InsertAsync(entity, session);
        }

        public override async Task UpdateAsync(MenuElement entity, ISession session)
        {
            entity.ModificationDate = DateTime.Now;
            await base.UpdateAsync(entity, session);
        }
    }
}
