using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
	public interface IProductRepository : IGenericRepository<Product>
	{
		Task<IList<Product>> GetProductListByIdListAsync(IList<int> productIdList, ISession session);
		Task DeleteAsync(int id, ISession session);
	}
	public class ProductRepository : GenericRepository<Product>, IProductRepository
	{
		public async Task<IList<Product>> GetProductListByIdListAsync(IList<int> productIdList, ISession session)
		{
			return await session.QueryOver<Product>()
									.WhereRestrictionOn(x => x.Id).IsIn(productIdList.ToArray())
									.ListAsync<Product>();
		}
		public async Task DeleteAsync(int id, ISession session)
		{
			var entity = await GetByIdAsync(id, session);
			entity.IsDeleted = true;
			await InsertAsync(entity, session);
		}

		public override async Task InsertAsync(Product entity, ISession session)
		{
			entity.CreateDate = DateTime.Now;
			entity.ModificationDate = DateTime.Now;
			await base.InsertAsync(entity, session);
		}

		public override async Task UpdateAsync(Product entity, ISession session)
		{
			entity.ModificationDate = DateTime.Now;
			await base.UpdateAsync(entity, session);
		}
	}
}
