using MySqlX.XDevAPI;
using NHibernate.Criterion;
using NHibernate.Loader;
using NHibernate.SqlCommand;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Dto.Picture;
using PizzeriaAPI.Repositories.BaseEntityRepository;
using PizzeriaAPI.Repositories.EntityRepository;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories.BaseEntityRepositories
{
    public interface IPictureRepository : IDateEntityRepository<Picture>
    {
        public Task<IList<Picture>> GetPictureListByIdListAsync(IList<int> pictureIdList, ISession session);
        Task DeleteAsync(int id, ISession session);
        Task<Picture> GetByIdAsync(int id, ISession session);
        Task<IList<Picture>> GetAllAsync(ISession session);
    }
    public class PictureRepository : DateEntityRepository<Picture>, IPictureRepository
    {
        public PictureRepository(IEventRepository eventRepository) : base(eventRepository, Domain.ControllerEnum.Picture)
        {
        }
        public async Task<IList<Picture>> GetAllAsync(ISession session)
        {

            var result = await session.QueryOver<Picture>()
                .OrderBy(x => x.Id).Asc
                .ListAsync<Picture>();

            return result.Select(picture =>
            {
                picture.EntityWithPictureList = picture.EntityWithPictureList?
                .Where(entityWithPicture => !entityWithPicture?.IsDeleted ?? false).ToList();
                return picture;
            }).ToList(); ;
        }
        public async Task<IList<Picture>> GetVisibleAsync(ISession session)
        {
            var result = await session.QueryOver<Picture>()
                .OrderBy(x=> x.Id).Asc
                .ListAsync<Picture>();

            return result.Select(picture =>
            {
                picture.EntityWithPictureList = picture.EntityWithPictureList?
                .Where(entityWithPicture => !entityWithPicture.IsDeleted && entityWithPicture.IsVisible).ToList();
                return picture;
            }).ToList(); ;
        }
        public async Task DeleteAsync(int id, ISession session)
        {
            var entity = await session.GetAsync<Picture>(id);
            if (entity == null)
                return;
            var entities = entity.EntityWithPictureList;
            foreach (var entityWithPicture in entities)
            {
                entityWithPicture?.PictureList?.Remove(entity);
                entity.ModificationDate = DateTime.Now;
                await session.UpdateAsync(entityWithPicture);
            }
            await session.DeleteAsync(entity);
        }
        public async Task<IList<Picture>> GetPictureListByIdListAsync(IList<int> pictureIdList, ISession session)
        {
            var result = await session.QueryOver<Picture>()
                .Where(x => x.Id.IsIn(pictureIdList.ToArray()))
                .OrderBy(x => x.Id).Asc
                .ListAsync<Picture>();

            return result.Select(picture =>
            {
                picture.EntityWithPictureList = picture.EntityWithPictureList?
                .Where(entityWithPicture => !entityWithPicture.IsDeleted).ToList();
                return picture;
            }).ToList(); ;
        }
    }
}
