using NHibernate.Criterion;
using NHibernate.SqlCommand;
using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories.EntityWithPictureRepositories
{
    public interface ICategoryRepository : IEntityWithPictureRepository<Category>
    {
        Task DeleteAsync(int id, ISession session);
        Task<Category> GetCategoryByNameAsync(string categoryName, ISession session);

    }
    public class CategoryRepository : EntityWithPictureRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(IEventRepository eventRepository) : base(eventRepository, Domain.ControllerEnum.Category)
        {
        }
        public override async Task<IList<Category>> GetVisibleAsync(ISession session)
        {
            var result = await base.GetVisibleAsync(session);
            return result.Select(category =>
            {
                category.ProductList = category.ProductList?.Where(product => (!product?.IsDeleted ?? false) && (product?.IsVisible ?? true)).ToList();
                return category;
            }).ToList();
        }

        public override async Task<IList<Category>> GetAllAsync(ISession session)
        {
            var result = await base.GetAllAsync(session);
            return result.Select(category =>
            {
                category.ProductList = category.ProductList?.Where(product => !product.IsDeleted).ToList();
                return category;
            }).ToList(); ;
        }

        public async Task<Category> GetCategoryByNameAsync(string categoryName, ISession session)
        {
            var result = await session.QueryOver<Category>()
                 .Where(x => x.IsDeleted == false)
                 .And(x => x.Name.IsLike(categoryName))
                 .OrderBy(x => x.Id).Asc
                 .SingleOrDefaultAsync<Category>();

            result.ProductList = result.ProductList?.Where(product => !product.IsDeleted).ToList();
            return result;
        }
        public async Task DeleteAsync(int id, ISession session)
        {
            var entity = await GetByIdAsync(id, session);
            if (entity == null)
                return;

            entity.ProductList?.Clear();
            await base.DeleteAsync(entity, session);
        }
    }
}
