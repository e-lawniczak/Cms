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
        public new async Task<IList<Product>> GetAllAsync(ISession session)
        {
            var result = await base.GetAllAsync(session);
            return result.OrderBy(x => x.Id).ToList();
        }
        public async Task<IList<Product>> GetProductListByIdListAsync(IList<int> productIdList, ISession session)
        {
            return await session.QueryOver<Product>()
                                    .WhereRestrictionOn(x => x.Id).IsIn(productIdList.ToArray()).OrderBy(x => x.Id).Asc
                                    .ListAsync<Product>();
        }
        public async Task DeleteAsync(int id, ISession session)
        {
            var entity = await GetByIdAsync(id, session);
            entity.IsDeleted = true;
            entity.IsRecommended = false;
            entity.PictureList?.Clear();
            entity.Category = null;
            await UpdateAsync(entity, session);
        }

        public override async Task InsertAsync(Product entity, ISession session)
        {
            entity.CreationDate = DateTime.Now;
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
