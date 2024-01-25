using MySqlX.XDevAPI;
using NHibernate.Criterion;
using NHibernate.Loader;
using NHibernate.SqlCommand;
using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
    public interface IPictureRepository : IGenericRepository<Picture>
    {
        public Task<IList<Picture>> GetPictureListByIdListAsync(IList<int> pictureIdList, ISession session);
        Task DeleteAsync(int id, ISession session);
        Task<IList<EntityWithPicture>> GetAllEntityWithPictureByIdsAsync(IList<int> entityWithPictureIdList, ISession session);
    }
    public class PictureRepository : GenericRepository<Picture>, IPictureRepository
    {
        public PictureRepository(IEventRepository eventRepository) : base(eventRepository)
        {
        }
        public new async Task<IList<Picture>> GetAllAsync(ISession session)
        {
            Picture pictureAlias= null;

            var result = await session.QueryOver(() => pictureAlias)
                .OrderBy(() => pictureAlias.PictureId).Asc
                .ListAsync<Picture>();

            return result.Select(picture =>
            {
                picture.EntityWithPictureList = picture.EntityWithPictureList?
                .Where(entityWithPicture => !entityWithPicture?.IsDeleted ?? false).ToList();
                return picture;
            }).ToList(); ;
        }
        public new async Task<IList<Picture>> GetVisibleAsync(ISession session)
        {
            Picture pictureAlias = null;

            var result = await session.QueryOver(() => pictureAlias)
                .OrderBy(() => pictureAlias.PictureId).Asc
                .ListAsync<Picture>();

            return result.Select(picture =>
            {
                picture.EntityWithPictureList = picture.EntityWithPictureList?
                .Where(entityWithPicture => !entityWithPicture.IsDeleted && entityWithPicture.IsVisible).ToList();
                return picture;
            }).ToList(); ;
        }
        public async Task<IList<EntityWithPicture>> GetAllEntityWithPictureByIdsAsync(IList<int> entityWithPictureIdList, ISession session)
        {
            EntityWithPicture entityWithPictureAlias = null;

            var result = await session.QueryOver(() => entityWithPictureAlias)
                .Where(() => entityWithPictureAlias.IsDeleted == false)
                .OrderBy(() => entityWithPictureAlias.Id).Asc
                .ListAsync<EntityWithPicture>();
            return result;
        }
        public async Task DeleteAsync(int id, ISession session)
        {
            var obj = await session.GetAsync<Picture>(id);
            if (obj == null)
                return;
            var entities = obj.EntityWithPictureList;
            foreach (var entityWithPicture in entities)
            {
                entityWithPicture?.PictureList?.Remove(obj);
                await session.UpdateAsync(entityWithPicture);
            }
            await session.DeleteAsync(obj);
        }
        public async Task<IList<Picture>> GetPictureListByIdListAsync(IList<int> pictureIdList, ISession session)
        {
            Picture pictureAlias = null;

            var result = await session.QueryOver(() => pictureAlias)
                .Where(() => pictureAlias.PictureId.IsIn(pictureIdList.ToArray()))
                .OrderBy(() => pictureAlias.PictureId).Asc
                .ListAsync<Picture>();

            return result.Select(picture =>
            {
                picture.EntityWithPictureList = picture.EntityWithPictureList?
                .Where(entityWithPicture => !entityWithPicture.IsDeleted).ToList();
                return picture;
            }).ToList(); ;
        }

        public override async Task InsertAsync(Picture entity, ISession session)
        {
            entity.CreationDate = DateTime.Now;
            entity.ModificationDate = DateTime.Now;
            await base.InsertAsync(entity, session);
        }

        public override async Task UpdateAsync(Picture entity, ISession session)
        {
            entity.ModificationDate = DateTime.Now;
            await base.UpdateAsync(entity, session);
        }
    }
}
