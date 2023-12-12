using NHibernate;
using NHibernate.Type;
using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
	public interface IPictureRepository : IGenericRepository<Picture> 
	{
		public Task<IList<Picture>> GetPictureListByIdListAsync(IList<int> pictureIdList, ISession session);
	}
	public class PictureRepository : GenericRepository<Picture>, IPictureRepository
	{
		public async Task<IList<Picture>> GetPictureListByIdListAsync(IList<int> pictureIdList, ISession session)
		{
			return await session.QueryOver<Picture>()
									.WhereRestrictionOn(x => x.PictureId).IsIn(pictureIdList.ToArray())
									.ListAsync<Picture>();
		}
	}
}
