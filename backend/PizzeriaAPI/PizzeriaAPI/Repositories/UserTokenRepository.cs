using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Repositories
{
	public interface IUserTokenRepository : IGenericRepository<UserToken>
	{
	}
	public class UserTokenRepository : GenericRepository<UserToken>, IUserTokenRepository
	{
	}
}
