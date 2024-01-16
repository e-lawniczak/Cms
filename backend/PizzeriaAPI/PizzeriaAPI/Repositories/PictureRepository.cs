using NHibernate;
using NHibernate.Type;
using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
	public interface IPictureRepository : IGenericRepository<Picture> 
	{
		public Task<IList<Picture>> GetPictureListByIdListAsync(IList<int> pictureIdList, ISession session);
		Task DeleteAsync(int id, ISession session);
	}
	public class PictureRepository : GenericRepository<Picture>, IPictureRepository
	{
		public async Task DeleteAsync(int id, ISession session)
		{
			await DeleteAsync(id, session);
		}
		public async Task<IList<Picture>> GetPictureListByIdListAsync(IList<int> pictureIdList, ISession session)
		{
			return await session.QueryOver<Picture>()
									.WhereRestrictionOn(x => x.PictureId).IsIn(pictureIdList.ToArray())
									.ListAsync<Picture>();
		}

		public override async Task InsertAsync(Picture entity, ISession session)
		{
			entity.CreateDate = DateTime.Now;
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
