using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
    public interface IUserTokenRepository : IGenericRepository<UserToken>
    {
        Task DeleteAsync(UserToken entity, ISession session);
        Task<UserToken> GetUserTokenByTokenAsync(string token, ISession session);
    }
    public class UserTokenRepository : GenericRepository<UserToken>, IUserTokenRepository
    {
        public async Task<UserToken> GetUserTokenByTokenAsync(string token, ISession session)
        {
            return await session.QueryOver<UserToken>()
                .Where(x => x.Token == token)
                .SingleOrDefaultAsync<UserToken>();
        }
        public new async Task<IList<UserToken>> GetAllAsync(ISession session)
        {
            var result = await base.GetAllAsync(session);
            return result.OrderBy(x => x.UserTokenId).ToList();
        }
        public async Task DeleteAsync(UserToken entity, ISession session)
        {
            await session.DeleteAsync(entity);
        }

    }
}
