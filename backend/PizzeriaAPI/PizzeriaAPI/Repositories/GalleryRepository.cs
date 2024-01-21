using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
    public interface IGalleryRepository : IGenericRepository<Gallery>
    {
        Task DeleteAsync(int id, ISession session);
        Task<Gallery> GetGalleryByNameAsync(string galleryname, ISession session);
    }
    public class GalleryRepository : GenericRepository<Gallery>, IGalleryRepository
    {
        public async Task<Gallery> GetGalleryByNameAsync(string galleryname, ISession session)
        {
            return await session.QueryOver<Gallery>()
                .Where(x => x.Name == galleryname)
                .SingleOrDefaultAsync();
        }
        public async Task DeleteAsync(int id, ISession session)
        {
            var entity = await GetByIdAsync(id, session);
            entity.IsDeleted = true;
            await UpdateAsync(entity, session);
        }

        public override async Task InsertAsync(Gallery entity, ISession session)
        {
            entity.CreationDate = DateTime.Now;
            entity.ModificationDate = DateTime.Now;
            await base.InsertAsync(entity, session);
        }

        public override async Task UpdateAsync(Gallery entity, ISession session)
        {
            entity.ModificationDate = DateTime.Now;
            await base.UpdateAsync(entity, session);
        }
    }
}
