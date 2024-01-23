using NHibernate.Criterion;
using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
    public interface IProductRepository : IGenericRepository<Product>
    {
        Task<IList<Product>> GetAllProductListByIdListAsync(IList<int> productIdList, ISession session);
        Task DeleteAsync(int id, ISession session);
        Task<IList<Product>> GetVisibleProducts(ISession session);
        Task<IList<Product>> GetAllProductsAsync(ISession session);
    }
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        public async Task<IList<Product>> GetVisibleProducts(ISession session)
        {
            Product productAlias = null;
            var result = await session.QueryOver(() => productAlias)
                 .Where(() => productAlias.IsDeleted == false)
                 .And(() => productAlias.IsVisible == true)
                 .OrderBy(() => productAlias.Id).Asc
                 .ListAsync<Product>();
            return result.Select(product =>
            {
                product.Category = (!product.Category?.IsDeleted ?? false) && (product.Category?.IsVisible ?? true) ? product.Category : null;
                return product;
            }).ToList();
        }
        public async Task<IList<Product>> GetAllProductsAsync(ISession session)
        {
            Product productAlias = null;
            var result = await session.QueryOver(() => productAlias)
                 .Where(() => productAlias.IsDeleted == false)
                 .OrderBy(() => productAlias.Id).Asc
                 .ListAsync<Product>();
            return result.Select(product =>
            {
                product.Category = (!product.Category?.IsDeleted ?? false) ? product.Category : null;
                return product;
            }).ToList();
        }
        public async Task<IList<Product>> GetAllProductListByIdListAsync(IList<int> productIdList, ISession session)
        {
            Product productAlias = null;
            var result = await session.QueryOver(() => productAlias)
                 .Where(() => productAlias.IsDeleted == false)
                 .And(() => productAlias.Id.IsIn(productIdList.ToArray()))
                 .OrderBy(() => productAlias.Id).Asc
                 .ListAsync<Product>();
            return result.Select(product =>
            {
                product.Category = (!product.Category?.IsDeleted ?? false) ? product.Category : null;
                return product;
            }).ToList();
        }
        public async Task DeleteAsync(int id, ISession session)
        {
            var entity = await GetByIdAsync(id, session);
            if (entity == null)
                return;

            entity.IsDeleted = true;
            entity.IsRecommended = false;
            entity.PictureList?.Clear();
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
