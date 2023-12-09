using System.Security.Claims;

namespace PizzeriaAPI.Security
{
	public interface IUserManager<TUser> where TUser : class
	{
		Task<List<string>> GetRolesAsync(TUser user);
		Task<List<Claim>> GetClaimsAsync(TUser user);
		Task<TUser> FindByEmailAsync(string email);
		Task<UserManagerResult> CreateAsync(TUser user, string password);
	}
}
