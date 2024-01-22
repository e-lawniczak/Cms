using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
    public interface ITeamMemberRepository : IGenericRepository<TeamMember>
    {
        Task DeleteAsync(int id, ISession session);

    }
    public class TeamMemberRepository : GenericRepository<TeamMember>, ITeamMemberRepository
    {
        public new async Task<IList<TeamMember>> GetAllAsync(ISession session)
        {
            var result = await base.GetAllAsync(session);
            return result.OrderBy(x => x.Id).ToList();
        }
        public async Task DeleteAsync(int id, ISession session)
        {
            var entity = await GetByIdAsync(id, session);
            entity.IsDeleted = true;
            entity.PictureList?.Clear();
            entity.SocialMediaList?.Clear();
            await UpdateAsync(entity, session);
        }
        public override async Task InsertAsync(TeamMember entity, ISession session)
        {
            entity.CreationDate = DateTime.Now;
            entity.ModificationDate = DateTime.Now;
            await base.InsertAsync(entity, session);
        }

        public override async Task UpdateAsync(TeamMember entity, ISession session)
        {
            entity.ModificationDate = DateTime.Now;
            await base.UpdateAsync(entity, session);
        }
    }
}
