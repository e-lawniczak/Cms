using NHibernate.Criterion;
using NHibernate.SqlCommand;
using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
    public interface ITeamMemberRepository : IGenericRepository<TeamMember>
    {
        Task DeleteAsync(int id, ISession session);
        Task<IList<TeamMember>> GetTeamMemberListByIdListAsync(IList<int> teamMemberIdList, ISession session);

    }
    public class TeamMemberRepository : GenericRepository<TeamMember>, ITeamMemberRepository
    {
        public TeamMemberRepository(IEventRepository eventRepository) : base(eventRepository)
        {
        }
        public async Task<IList<TeamMember>> GetTeamMemberListByIdListAsync(IList<int> teamMemberIdList, ISession session)
        {
            TeamMember teamMemberAlias = null;
            var result = await session.QueryOver(() => teamMemberAlias)
                 .Where(() => teamMemberAlias.IsDeleted == false)
                 .And(() => teamMemberAlias.Id.IsIn(teamMemberIdList.ToArray()))
                 .OrderBy(() => teamMemberAlias.Id).Asc
                 .ListAsync<TeamMember>();
            return result.Select(teammember =>
            {
                teammember.SocialMediaList = teammember.SocialMediaList?.Where(socialMedia => !socialMedia?.IsDeleted ?? false).ToList();
                teammember.Role = (!teammember.Role?.IsDeleted ?? false) ? teammember.Role : null;
                return teammember;
            }).ToList();
        }
        public new async Task<IList<TeamMember>> GetAllAsync(ISession session)
        {
            TeamMember teamMemberAlias = null;
            var result = await session.QueryOver(() => teamMemberAlias)
                 .Where(() => teamMemberAlias.IsDeleted == false)
                 .OrderBy(() => teamMemberAlias.Id).Asc
                 .ListAsync<TeamMember>();
            return result.Select(teammember =>
            {
                teammember.SocialMediaList = teammember.SocialMediaList?.Where(socialMedia => !socialMedia?.IsDeleted ?? false).ToList();
                teammember.Role = (!teammember.Role?.IsDeleted ?? false) ? teammember.Role : null;
                return teammember;
            }).ToList();
        }
        public new async Task<IList<TeamMember>> GetVisibleAsync(ISession session)
        {
            TeamMember teamMemberAlias = null;
            var result = await session.QueryOver(() => teamMemberAlias)
                 .Where(() => teamMemberAlias.IsDeleted == false)
                 .And(() => teamMemberAlias.IsVisible == true)
                 .OrderBy(() => teamMemberAlias.Id).Asc
                 .ListAsync<TeamMember>();
            return result.Select(teammember =>
            {
                teammember.SocialMediaList = teammember.SocialMediaList?.Where(socialMedia => (!socialMedia?.IsDeleted ??false) && (socialMedia?.IsVisible??true)).ToList();
                teammember.Role = ((!teammember.Role?.IsDeleted ?? false) && (teammember.Role?.IsVisible ?? true)) ? teammember.Role : null;
                return teammember;
            }).ToList();
        }
        public async Task DeleteAsync(int id, ISession session)
        {
            var entity = await GetByIdAsync(id, session);
            entity.IsDeleted = true;
            entity.SocialMediaList.Clear();
            entity.Role = null;
            entity.PictureList?.Clear();
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
