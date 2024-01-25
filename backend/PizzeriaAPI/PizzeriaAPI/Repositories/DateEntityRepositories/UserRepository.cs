using NHibernate.Criterion;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Repositories.BaseEntityRepository;
using PizzeriaAPI.Repositories.EntityRepository;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories.BaseEntityRepositories
{
    public interface IUserRepository : IDateEntityRepository<User>
    {
        Task<User> GetUserByEmailAsync(string email, ISession session);
        Task<IList<User>> GetAllAsync(ISession session);
    }
    public class UserRepository : DateEntityRepository<User>, IUserRepository
    {
        public UserRepository(IEventRepository eventRepository) : base(eventRepository, Domain.ControllerEnum.User)
        {
        }
        public async Task<IList<User>> GetAllAsync(ISession session)
        {
            var result = await session.QueryOver<User>()
                .OrderBy(x => x.Id).Asc
                .ListAsync<User>();
            return result;
        }

        public async Task<User> GetUserByEmailAsync(string email, ISession session)
        {
            return await session.QueryOver<User>().Where(Restrictions.Eq("Email", email)).SingleOrDefaultAsync();
        }
    }
}
