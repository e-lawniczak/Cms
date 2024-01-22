using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
    public interface IPictureRepository : IGenericRepository<Picture>
    {
        public Task<IList<Picture>> GetPictureListByIdListAsync(IList<int> pictureIdList, ISession session);
        Task DeleteAsync(int id, ISession session);
        Task<IList<EntityWithPicture>> GetEntityWithPictureByIdsAsync(IList<int> entityWithPictureIdList, ISession session);
    }
    public class PictureRepository : GenericRepository<Picture>, IPictureRepository
    {
        public new async Task<IList<Picture>> GetAllAsync(ISession session)
        {
            var result = await base.GetAllAsync(session);
            return result.OrderBy(x => x.PictureId).ToList();
        }
        public async Task<IList<EntityWithPicture>> GetEntityWithPictureByIdsAsync(IList<int> entityWithPictureIdList, ISession session)
        {
            return await session.QueryOver<EntityWithPicture>()
                .WhereRestrictionOn(x => x.Id).IsIn(entityWithPictureIdList.ToArray())
                .OrderBy(x => x.Id).Asc
                .ListAsync();
        }
        public async Task DeleteAsync(int id, ISession session)
        {
            var obj = await session.GetAsync<Picture>(id);
            if (obj == null)
                return;
            obj.EntityWithPictureList?.Clear();
            await session.DeleteAsync(obj);
        }
        public async Task<IList<Picture>> GetPictureListByIdListAsync(IList<int> pictureIdList, ISession session)
        {
            return await session.QueryOver<Picture>()
                                    .WhereRestrictionOn(x => x.PictureId).IsIn(pictureIdList.ToArray())
                                    .OrderBy(x => x.PictureId).Asc
                                    .ListAsync<Picture>();
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
