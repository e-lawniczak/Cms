using NHibernate.Criterion;
using NHibernate.SqlCommand;
using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;


namespace PizzeriaAPI.Repositories.EntityWithPictureRepositories
{
    public interface ISocialMediaRepository : IEntityWithPictureRepository<SocialMedia>
    {
        Task DeleteAsync(int id, ISession session);
        Task<IList<SocialMedia>> GetAllMainSocialMedia(ISession session);
    }
    public class SocialMediaRepository : EntityWithPictureRepository<SocialMedia>, ISocialMediaRepository
    {
        public SocialMediaRepository(IEventRepository eventRepository) : base(eventRepository, Domain.ControllerEnum.SocialMedia)
        {
        }
        public override async Task<IList<SocialMedia>> GetAllAsync(ISession session)
        {
            var result = await base.GetAllAsync(session);
            return result.Select(socialMedia =>
            {
                socialMedia.TeamMember = !socialMedia.TeamMember?.IsDeleted ?? false ? socialMedia.TeamMember : null;
                return socialMedia;
            }).ToList();
        }

        public override async Task<IList<SocialMedia>> GetVisibleAsync(ISession session)
        {
            var result = await base.GetVisibleAsync(session);
            return result.Select(socialMedia =>
            {
                socialMedia.TeamMember = (!socialMedia.TeamMember?.IsDeleted ?? false) &&
                (socialMedia.TeamMember?.IsVisible ?? true) ? socialMedia.TeamMember : null;
                return socialMedia;
            }).ToList();
        }
        public async Task<IList<SocialMedia>> GetAllMainSocialMedia(ISession session)
        {
            var result = await session.QueryOver<SocialMedia>()
                 .Where(x => x.IsDeleted == false)
                 .And(x => x.IsMain == true)
                 .OrderBy(x => x.Id).Asc
                 .ListAsync<SocialMedia>();

            return result.Select(socialMedia =>
            {
                socialMedia.TeamMember = !socialMedia.TeamMember?.IsDeleted ?? false ? socialMedia.TeamMember : null;
                return socialMedia;
            }).ToList();
        }
        public async Task<IList<SocialMedia>> GetSocialMediaListByIdListAsync(IList<int> socialMediaIdList, ISession session)
        {
            var result = await base.GetByIdListAsync(socialMediaIdList, session);

            return result.Select(socialMedia =>
            {
                socialMedia.TeamMember = !socialMedia.TeamMember?.IsDeleted ?? false ? socialMedia.TeamMember : null;
                return socialMedia;
            }).ToList();
        }
        public async Task DeleteAsync(int id, ISession session)
        {
            var entity = await GetByIdAsync(id, session);
            if (entity == null)
                return;
            entity.TeamMember = null;
            await base.DeleteAsync(entity, session);
        }
    }
}
