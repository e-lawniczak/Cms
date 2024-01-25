using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Domain;
using PizzeriaAPI.Repositories.BaseEntityRepository;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories.EntityRepository
{
    public interface IUserTokenRepository : IEntityRepository<UserToken>
    {
        Task<UserToken> GetUserTokenByTokenAsync(string token, ISession session);
        Task<IList<UserToken>> GetAllAsync(ISession session);
    }
    public class UserTokenRepository : EntityRepository<UserToken>, IUserTokenRepository
    {
        public UserTokenRepository(IEventRepository eventRepository): base(eventRepository, ControllerEnum.UserToken)
        {
        }
        public async Task<UserToken> GetUserTokenByTokenAsync(string token, ISession session)
        {
            return await session.QueryOver<UserToken>()
                .Where(x => x.Token == token)
                .SingleOrDefaultAsync<UserToken>();
        }
        public async Task<IList<UserToken>> GetAllAsync(ISession session)
        {
            var result = await session.QueryOver<UserToken>()
                .OrderBy(x => x.Id).Asc.ListAsync();
            return result;
        }

    }
}
