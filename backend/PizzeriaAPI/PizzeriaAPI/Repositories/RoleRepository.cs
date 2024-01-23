using NHibernate.SqlCommand;
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
            Role roleAlias = null;
            var result = await session.QueryOver(() => roleAlias)
                 .Where(() => roleAlias.IsDeleted == false)
                 .OrderBy(() => roleAlias.RoleId).Asc
                 .ListAsync<Role>();
            return result.Select(role =>
            {
                role.TestimonialList = role.TestimonialList?.Where(testimonial => !testimonial.IsDeleted).ToList();
                role.TeamMemberList = role.TeamMemberList?.Where(teamMember => !teamMember.IsDeleted).ToList();
                return role;
            }).ToList();
        }

        public new async Task<IList<Role>> GetVisibleAsync(ISession session)
        {
            Role roleAlias = null;
            var result = await session.QueryOver(() => roleAlias)
                 .Where(() => roleAlias.IsDeleted == false)
                 .And(() => roleAlias.IsVisible == true)
                 .OrderBy(() => roleAlias.RoleId).Asc
                 .ListAsync<Role>();
            return result.Select(role =>
            {
                role.TestimonialList = role.TestimonialList?.Where(testimonial => !testimonial.IsDeleted && testimonial.IsVisible).ToList();
                role.TeamMemberList = role.TeamMemberList?.Where(teamMember => !teamMember.IsDeleted && teamMember.IsVisible).ToList();
                return role;
            }).ToList();
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
