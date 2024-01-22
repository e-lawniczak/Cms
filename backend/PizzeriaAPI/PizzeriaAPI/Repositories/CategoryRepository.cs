using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
    public interface ICategoryRepository : IGenericRepository<Category>
    {
        Task DeleteAsync(int id, ISession session);
        Task<Category> GetCategoryByNameAsync(string categoryName, ISession session);

    }
    public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
    {
        private readonly IProductRepository productRepository;
        public CategoryRepository(IProductRepository productRepository)
        {
            this.productRepository = productRepository;
        }
        public new async Task<IList<Category>> GetAllAsync(ISession session)
        {
            var categoryList = await base.GetAllAsync(session);
            return categoryList.OrderBy(x => x.Id).ToList();
        }

        public async Task<Category> GetCategoryByNameAsync(string categoryName, ISession session)
        {
            return await session.QueryOver<Category>()
                .Where(x => x.Name == categoryName)
                .SingleOrDefaultAsync();
        }
        public async Task DeleteAsync(int id, ISession session)
        {
            var entity = await GetByIdAsync(id, session);
            entity.IsDeleted = true;
            
            foreach (var product in entity.ProductList)
            {
                await productRepository.DeleteAsync(product.Id, session);
            }
            entity.ProductList.Clear();
            entity.PictureList?.Clear();

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
