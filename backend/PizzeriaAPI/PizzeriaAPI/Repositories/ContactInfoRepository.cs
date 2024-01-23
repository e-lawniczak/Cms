using NHibernate.Linq;
using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
    public interface IContactInfoRepository : IGenericRepository<ContactInfo>
    {
        Task DeleteAsync(int id, ISession session);
    }
    public class ContactInfoRepository : GenericRepository<ContactInfo>, IContactInfoRepository
    {
        public new async Task<IList<ContactInfo>> GetAllAsync(ISession session)
        {
            ContactInfo contactInfoAlias = null;

            var result = await session.QueryOver(() => contactInfoAlias)
                .Where(() => contactInfoAlias.IsDeleted == false)
                .OrderBy(() => contactInfoAlias.Id).Asc
                .ListAsync<ContactInfo>();

            return result;
        }
        public new async Task<IList<ContactInfo>> GetVisibleAsync(ISession session)
        {
            ContactInfo contactInfoAlias = null;

            var result = await session.QueryOver(() => contactInfoAlias)
                .Where(() => contactInfoAlias.IsDeleted == false)
                .And(() => contactInfoAlias.IsVisible == true)
                .OrderBy(() => contactInfoAlias.Id).Asc
                .ListAsync<ContactInfo>();

            return result;
        }
        public async Task DeleteAsync(int id, ISession session)
        {
            var entity = await GetByIdAsync(id, session);
            if(entity == null)
                return;
            entity.IsDeleted = true;
            entity.PictureList?.Clear();
            await UpdateAsync(entity, session);
        }

        public override async Task InsertAsync(ContactInfo entity, ISession session)
        {
            entity.CreationDate = DateTime.Now;
            entity.ModificationDate = DateTime.Now;
            await base.InsertAsync(entity, session);
        }

        public override async Task UpdateAsync(ContactInfo entity, ISession session)
        {
            entity.ModificationDate = DateTime.Now;
            await base.UpdateAsync(entity, session);
        }
    }
}
