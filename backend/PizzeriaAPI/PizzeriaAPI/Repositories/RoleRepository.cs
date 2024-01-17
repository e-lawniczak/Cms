using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
	public interface IRoleRepository : IGenericRepository<Role>
	{
	}
	public class RoleRepository : GenericRepository<Role>, IRoleRepository
	{
		public override async Task InsertAsync(Role entity, ISession session)
		{
			entity.CreationDate = DateTime.Now;
			entity.ModificationDate = DateTime.Now;
			await base.InsertAsync(entity, session);
		}

		public override async Task UpdateAsync(Role entity, ISession session)
		{
			entity.ModificationDate = DateTime.Now;
			await base.UpdateAsync(entity, session);
		}
	}
}
