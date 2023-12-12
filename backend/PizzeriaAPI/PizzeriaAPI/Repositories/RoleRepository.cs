using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Repositories
{
	public interface IRoleRepository : IGenericRepository<Role> { }
	public class RoleRepository: GenericRepository<Role>, IRoleRepository
	{
	}
}
