using NHibernate.SqlCommand;
using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
    public interface ITestimonialRepository : IGenericRepository<Testimonial>
    {
        Task DeleteAsync(int id, ISession session);

    }
    public class TestimonialRepository : GenericRepository<Testimonial>, ITestimonialRepository
    {
        public new async Task<IList<Testimonial>> GetAllAsync(ISession session)
        {
            Testimonial testimonialAlias = null;
            var result = await session.QueryOver(() => testimonialAlias)
                 .Where(() => testimonialAlias.IsDeleted == false)
                 .OrderBy(() => testimonialAlias.Id).Asc
                 .ListAsync<Testimonial>();
            return result.Select(testimonial =>
            {
                testimonial.Role = ((!testimonial.Role?.IsDeleted ?? false)) ? testimonial.Role : null;
                return testimonial;
            }).ToList();
        }

        public new async Task<IList<Testimonial>> GetVisibleAsync(ISession session)
        {
            Testimonial testimonialAlias = null;
            var result = await session.QueryOver(() => testimonialAlias)
                 .Where(() => testimonialAlias.IsDeleted == false)
                 .And(() => testimonialAlias.IsVisible == true)
                 .OrderBy(() => testimonialAlias.Id).Asc
                 .ListAsync<Testimonial>();
            return result.Select(testimonial =>
            {
                testimonial.Role = ((!testimonial.Role?.IsDeleted ?? false) && (testimonial.Role?.IsVisible ?? true)) ? testimonial.Role : null;
                return testimonial;
            }).ToList();
        }
        public async Task DeleteAsync(int id, ISession session)
        {
            var entity = await GetByIdAsync(id, session);
            entity.IsDeleted = true;
            await UpdateAsync(entity, session);
        }
        public override async Task InsertAsync(Testimonial entity, ISession session)
        {
            entity.CreationDate = DateTime.Now;
            entity.ModificationDate = DateTime.Now;
            await base.InsertAsync(entity, session);
        }

        public override async Task UpdateAsync(Testimonial entity, ISession session)
        {
            entity.ModificationDate = DateTime.Now;
            await base.UpdateAsync(entity, session);
        }
    }
}
