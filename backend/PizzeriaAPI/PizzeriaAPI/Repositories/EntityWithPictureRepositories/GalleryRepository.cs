using NHibernate.Criterion;
using NHibernate.Linq;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Repositories.EntityRepository;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories.EntityWithPictureRepositories
{
    public interface IGalleryRepository : IEntityWithPictureRepository<Gallery>
    {
        Task DeleteAsync(int id, ISession session);
        Task<Gallery> GetGalleryByNameAsync(string galleryname, ISession session);
    }
    public class GalleryRepository : EntityWithPictureRepository<Gallery>, IGalleryRepository
    {
        public GalleryRepository(IEventRepository eventRepository) : base(eventRepository, Domain.ControllerEnum.Gallery)
        {
        }
        public async Task<Gallery> GetGalleryByNameAsync(string galleryname, ISession session)
        {

            var result = await session.QueryOver<Gallery>()
                .Where(x => x.IsDeleted == false)
                .And(x => x.Name.IsLike(galleryname))
                .OrderBy(x => x.Id).Asc
                .SingleOrDefaultAsync<Gallery>();

            return result;
        }
        public async Task DeleteAsync(int id, ISession session)
        {
            var entity = await session.GetAsync<Gallery>(id);
            if (entity == null)
                return;
            await session.DeleteAsync(entity); 
        }
    }
}
