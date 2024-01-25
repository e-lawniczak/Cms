using NHibernate.Criterion;
using NHibernate.Linq;
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
        public GalleryRepository(IEventRepository eventRepository) : base(eventRepository)
        {
        }
        public new async Task<IList<Gallery>> GetAllAsync(ISession session)
        {
            Gallery galleryAlias = null;

            var result = await session.QueryOver(() => galleryAlias)
                .Where(() => galleryAlias.IsDeleted == false)
                .OrderBy(() => galleryAlias.Id).Asc
                .ListAsync<Gallery>();

            return result;
        }
        public async Task<Gallery> GetGalleryByNameAsync(string galleryname, ISession session)
        {
            Gallery galleryAlias = null;

            var result = await session.QueryOver(() => galleryAlias)
                .Where(() => galleryAlias.IsDeleted == false)
                .And(() => galleryAlias.Name.IsLike(galleryname))
                .OrderBy(() => galleryAlias.Id).Asc
                .SingleOrDefaultAsync<Gallery>();

            return result;
        }
        public new async Task<IList<Gallery>> GetVisibleAsync(ISession session)
        {
            Gallery galleryAlias = null;

            var result = await session.QueryOver(() => galleryAlias)
                .Where(() => galleryAlias.IsDeleted == false)
                .And(() => galleryAlias.IsVisible == true)
                .OrderBy(() => galleryAlias.Id).Asc
                .ListAsync<Gallery>();

            return result;
        }
        public async Task DeleteAsync(int id, ISession session)
        {
            var entity = await GetByIdAsync(id, session);
            entity.IsDeleted = true;
            entity.PictureList?.Clear();
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
