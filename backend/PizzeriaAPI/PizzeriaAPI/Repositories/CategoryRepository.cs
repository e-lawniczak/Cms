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
