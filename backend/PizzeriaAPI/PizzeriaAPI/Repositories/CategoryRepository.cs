﻿using NHibernate.Criterion;
using NHibernate.SqlCommand;
using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
    public interface ICategoryRepository : IGenericRepository<Category>
    {
        Task DeleteAsync(int id, ISession session);
        Task<Category> GetCategoryByNameAsync(string categoryName, ISession session);
        Task<IList<Category>> GetVisibleCategories(ISession session);

    }
    public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
    {
        private readonly IProductRepository productRepository;
        public CategoryRepository(IProductRepository productRepository)
        {
            this.productRepository = productRepository;
        }
        public async Task<IList<Category>> GetVisibleCategories(ISession session)
        {
            Category categoryAlias = null;
            var result = await session.QueryOver(() => categoryAlias)
                 .Where(() => categoryAlias.IsDeleted == false)
                 .And(() => categoryAlias.IsVisible == true)
                 .OrderBy(() => categoryAlias.Id).Asc
                 .ListAsync<Category>();
            return result.Select(category =>
            {
                category.ProductList = category.ProductList?.Where(product => !product.IsDeleted && product.IsVisible).ToList();
                return category;
            }).ToList();
        }

        public new async Task<IList<Category>> GetAllAsync(ISession session)
        {
            Category categoryAlias = null;
            var result = await session.QueryOver(() => categoryAlias)
                 .Where(() => categoryAlias.IsDeleted == false)
                 .OrderBy(() => categoryAlias.Id).Asc
                 .ListAsync<Category>();
            return result.Select(category =>
            {
                category.ProductList = category.ProductList?.Where(product => !product.IsDeleted).ToList();
                return category;
            }).ToList(); ;
        }

        public async Task<Category> GetCategoryByNameAsync(string categoryName, ISession session)
        {
            Category categoryAlias = null;
            Product productAlias = null;

            var result = await session.QueryOver(() => categoryAlias)
                .JoinAlias(() => categoryAlias.ProductList, () => productAlias)
                .Where(() => categoryAlias.IsDeleted == false)
                .And(() => categoryAlias.IsVisible == true)
                .And(() => productAlias.IsDeleted == false)
                .And(() => productAlias.IsVisible == true)
                .And(() => categoryAlias.Name == categoryName)
                .OrderBy(() => categoryAlias.Id).Asc
                .SingleOrDefaultAsync<Category>();
            return result;
        }
        public async Task DeleteAsync(int id, ISession session)
        {
            var entity = await GetByIdAsync(id, session);
            if (entity == null)
                return;

            entity.IsDeleted = true;
            await UpdateAsync(entity, session);
        }

        public override async Task InsertAsync(Category entity, ISession session)
        {
            entity.CreationDate = DateTime.Now;
            entity.ModificationDate = DateTime.Now;
            await base.InsertAsync(entity, session);
        }

        public override async Task UpdateAsync(Category entity, ISession session)
        {
            entity.ModificationDate = DateTime.Now;
            await base.UpdateAsync(entity, session);
        }
    }
}
