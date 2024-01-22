using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
    public interface IRoleRepository : IGenericRepository<Role>
    {
        Task DeleteAsync(int id, ISession session);
    }
    public class RoleRepository : GenericRepository<Role>, IRoleRepository
    {
        public async Task DeleteAsync(int id, ISession session)
        {
            var entity = await GetByIdAsync(id, session);
            entity.IsDeleted = true;

            await UpdateAsync(entity, session);
        }
        public new async Task<IList<Role>> GetAllAsync(ISession session)
        {
            var result = await base.GetAllAsync(session);
            return result.OrderBy(x => x.RoleId).ToList();
        }
        public override async Task InsertAsync(Role entity, ISession session)
        {
            entity.CreationDate = DateTime.Now;
            entity.ModificationDate = DateTime.Now;
            await base.InsertAsync(entity, session);
        }

        public override async Task UpdateAsync(Role entity, ISession session)
        {
            entity.ModificationDate = DateTime.Now;
            await base.UpdateAsync(entity, session);
        }
    }
}
