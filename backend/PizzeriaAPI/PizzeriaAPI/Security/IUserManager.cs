using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Domain;
using System.Security.Claims;

namespace PizzeriaAPI.Security
{
	public interface IUserManager<TUser> where TUser : class
	{
		Task<List<string>> GetRolesAsync(TUser user);
		Task<List<Claim>> GetClaimsAsync(TUser user);
		Task<TUser> FindByEmailAsync(string email);
		Task<UserManagerResult> CreateAsync(TUser user, string password);
		Task<UserManagerResult> UpdateAsync(User user);
		Task<string> SaveTokenAsync(User user, string token);

	}
}
