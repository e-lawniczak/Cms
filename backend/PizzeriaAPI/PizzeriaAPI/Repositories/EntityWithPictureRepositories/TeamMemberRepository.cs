using NHibernate.Criterion;
using NHibernate.SqlCommand;
using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories.EntityWithPictureRepositories
{
    public interface ITeamMemberRepository : IEntityWithPictureRepository<TeamMember>
    {
        Task DeleteAsync(int id, ISession session);
    }
    public class TeamMemberRepository : EntityWithPictureRepository<TeamMember>, ITeamMemberRepository
    {
        public TeamMemberRepository(IEventRepository eventRepository) : base(eventRepository, Domain.ControllerEnum.TeamMember)
        {
        }
        public override async Task<IList<TeamMember>> GetByIdListAsync(IList<int> teamMemberIdList, ISession session)
        {
            var result = await base.GetByIdListAsync(teamMemberIdList, session);
            return result.Select(teammember =>
            {
                teammember.SocialMediaList = teammember.SocialMediaList?.Where(socialMedia => !socialMedia?.IsDeleted ?? false).ToList();
                teammember.Role = !teammember.Role?.IsDeleted ?? false ? teammember.Role : null;
                return teammember;
            }).ToList();
        }
        public override async Task<IList<TeamMember>> GetAllAsync(ISession session)
        {
            var result = await base.GetAllAsync(session);
            return result.Select(teammember =>
            {
                teammember.SocialMediaList = teammember.SocialMediaList?.Where(socialMedia => !socialMedia?.IsDeleted ?? false).ToList();
                teammember.Role = !teammember.Role?.IsDeleted ?? false ? teammember.Role : null;
                return teammember;
            }).ToList();
        }
        public override async Task<IList<TeamMember>> GetVisibleAsync(ISession session)
        {
            var result = await base.GetVisibleAsync(session);
            return result.Select(teammember =>
            {
                teammember.SocialMediaList = teammember.SocialMediaList?.Where(socialMedia => (!socialMedia?.IsDeleted ?? false) && (socialMedia?.IsVisible ?? true)).ToList();
                teammember.Role = (!teammember.Role?.IsDeleted ?? false) && (teammember.Role?.IsVisible ?? true) ? teammember.Role : null;
                return teammember;
            }).ToList();
        }
        public async Task DeleteAsync(int id, ISession session)
        {
            var entity = await GetByIdAsync(id, session);
            if (entity == null)
                return;
            entity.SocialMediaList?.Clear();
            entity.Role = null;
            await base.DeleteAsync(entity, session);
        }
    }
}
