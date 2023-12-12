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
		public async Task DeleteAsync(int id, ISession session)
		{
			var entity = await GetByIdAsync(id, session);
			entity.IsDeleted = true;
			await InsertOrUpdateAsync(entity, session);
		}
	}
}
