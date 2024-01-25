using NHibernate.Criterion;
using NHibernate.SqlCommand;
using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;


namespace PizzeriaAPI.Repositories
{
    public interface ISocialMediaRepository : IGenericRepository<SocialMedia>
    {
        Task<IList<SocialMedia>> GetSocialMediaListByIdListAsync(IList<int> socialMediaIdList, ISession session);
        Task DeleteAsync(int id, ISession session);
        Task<IList<SocialMedia>> GetAllMainSocialMedia(ISession session);
    }
    public class SocialMediaRepository : GenericRepository<SocialMedia>, ISocialMediaRepository
    {
        public SocialMediaRepository(IEventRepository eventRepository) : base(eventRepository)
        {
        }
        public new async Task<IList<SocialMedia>> GetAllAsync(ISession session)
        {
            SocialMedia socialMediaAlias = null;
            var result = await session.QueryOver(() => socialMediaAlias)
                 .Where(() => socialMediaAlias.IsDeleted == false)
                 .OrderBy(() => socialMediaAlias.Id).Asc
                 .ListAsync<SocialMedia>();
            return result.Select(socialMedia =>
            {
                socialMedia.TeamMember = !socialMedia.TeamMember?.IsDeleted ?? false ? socialMedia.TeamMember : null;
                return socialMedia;
            }).ToList();
        }

        public new async Task<IList<SocialMedia>> GetVisibleAsync(ISession session)
        {
            SocialMedia socialMediaAlias = null;
            var result = await session.QueryOver(() => socialMediaAlias)
                 .Where(() => socialMediaAlias.IsDeleted == false)
                 .And(() => socialMediaAlias.IsVisible == true)
                 .OrderBy(() => socialMediaAlias.Id).Asc
                 .ListAsync<SocialMedia>();
            return result.Select(socialMedia =>
            {
                socialMedia.TeamMember = (!socialMedia.TeamMember?.IsDeleted ?? false) && 
                (socialMedia.TeamMember?.IsVisible ?? true) ? socialMedia.TeamMember : null;
                return socialMedia;
            }).ToList();
        }
        public async Task<IList<SocialMedia>> GetAllMainSocialMedia(ISession session)
        {
            SocialMedia socialMediaAlias = null;
            var result = await session.QueryOver(() => socialMediaAlias)
                 .Where(() => socialMediaAlias.IsDeleted == false)
                 .And(() => socialMediaAlias.IsMain == true)
                 .OrderBy(() => socialMediaAlias.Id).Asc
                 .ListAsync<SocialMedia>();

            return result.Select(socialMedia =>
            {
                socialMedia.TeamMember = !socialMedia.TeamMember?.IsDeleted ?? false ? socialMedia.TeamMember : null;
                return socialMedia;
            }).ToList();
        }
        public async Task<IList<SocialMedia>> GetSocialMediaListByIdListAsync(IList<int> socialMediaIdList, ISession session)
        {
            SocialMedia socialMediaAlias = null;
            var result = await session.QueryOver(() => socialMediaAlias)
                 .Where(() => socialMediaAlias.IsDeleted == false)
                 .And(() => socialMediaAlias.Id.IsIn(socialMediaIdList.ToArray()))
                 .OrderBy(() => socialMediaAlias.Id).Asc
                 .ListAsync<SocialMedia>();

            return result.Select(socialMedia =>
            {
                socialMedia.TeamMember = !socialMedia.TeamMember?.IsDeleted ?? false ? socialMedia.TeamMember : null;
                return socialMedia;
            }).ToList();
        }
        public async Task DeleteAsync(int id, ISession session)
        {
            var entity = await GetByIdAsync(id, session);
            entity.IsDeleted = true;
            entity.PictureList?.Clear();
            entity.TeamMember = null;
            await UpdateAsync(entity, session);
        }
        public override async Task InsertAsync(SocialMedia entity, ISession session)
        {
            entity.CreationDate = DateTime.Now;
            entity.ModificationDate = DateTime.Now;
            await base.InsertAsync(entity, session);
        }

        public override async Task UpdateAsync(SocialMedia entity, ISession session)
        {
            entity.ModificationDate = DateTime.Now;
            await base.UpdateAsync(entity, session);
        }
    }
}
