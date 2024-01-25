using NHibernate.Criterion;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Repositories.EntityRepository;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories.EntityWithPictureRepositories
{
    public interface IProductRepository : IEntityWithPictureRepository<Product>
    {
        Task DeleteAsync(int id, ISession session);
    }
    public class ProductRepository : EntityWithPictureRepository<Product>, IProductRepository
    {
        public ProductRepository(IEventRepository eventRepository) : base(eventRepository, Domain.ControllerEnum.Product)
        {
        }
        public override async Task<IList<Product>> GetVisibleAsync(ISession session)
        {
            var result = await base.GetVisibleAsync(session);
            return result.Select(product =>
            {
                product.Category = (!product.Category?.IsDeleted ?? false) && (product.Category?.IsVisible ?? true) ? product.Category : null;
                return product;
            }).ToList();
        }
        public override async Task<IList<Product>> GetAllAsync(ISession session)
        {
            var result = await base.GetAllAsync(session);
            return result.Select(product =>
            {
                product.Category = !product.Category?.IsDeleted ?? false ? product.Category : null;
                return product;
            }).ToList();
        }
        public override async Task<IList<Product>> GetByIdListAsync(IList<int> productIdList, ISession session)
        {
            var result = await base.GetByIdListAsync(productIdList, session);
            return result.Select(product =>
            {
                product.Category = !product.Category?.IsDeleted ?? false ? product.Category : null;
                return product;
            }).ToList();
        }
        public async Task DeleteAsync(int id, ISession session)
        {
            var entity = await GetByIdAsync(id, session);
            if (entity == null)
                return;

            entity.IsRecommended = false;
            await base.DeleteAsync(entity, session);
        }
    }
}
