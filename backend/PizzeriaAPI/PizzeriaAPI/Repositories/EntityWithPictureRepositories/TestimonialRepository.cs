using NHibernate.Criterion;
using NHibernate.SqlCommand;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Repositories.EntityRepository;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories.EntityWithPictureRepositories
{
    public interface ITestimonialRepository : IEntityWithPictureRepository<Testimonial>
    {
        Task DeleteAsync(int id, ISession session);

    }
    public class TestimonialRepository : EntityWithPictureRepository<Testimonial>, ITestimonialRepository
    {
        public TestimonialRepository(IEventRepository eventRepository) : base(eventRepository, Domain.ControllerEnum.Testimonial)
        {
        }
        public override async Task<IList<Testimonial>> GetByIdListAsync(IList<int> testimonialIdList, ISession session)
        {
            var result = await base.GetByIdListAsync(testimonialIdList, session);
            return result.Select(testimonial =>
            {
                testimonial.Role = !testimonial.Role?.IsDeleted ?? false ? testimonial.Role : null;
                return testimonial;
            }).ToList();
        }
        public override async Task<IList<Testimonial>> GetAllAsync(ISession session)
        {
            var result = await base.GetAllAsync(session);
            return result.Select(testimonial =>
            {
                testimonial.Role = !testimonial.Role?.IsDeleted ?? false ? testimonial.Role : null;
                return testimonial;
            }).ToList();
        }

        public override async Task<IList<Testimonial>> GetVisibleAsync(ISession session)
        {
            var result = await base.GetVisibleAsync(session);
            return result.Select(testimonial =>
            {
                testimonial.Role = (!testimonial.Role?.IsDeleted ?? false) && (testimonial.Role?.IsVisible ?? true) ? testimonial.Role : null;
                return testimonial;
            }).ToList();
        }
        public async Task DeleteAsync(int id, ISession session)
        {
            var entity = await GetByIdAsync(id, session);
            entity.Role = null;
            await base.DeleteAsync(entity, session);
        }
    }
}
