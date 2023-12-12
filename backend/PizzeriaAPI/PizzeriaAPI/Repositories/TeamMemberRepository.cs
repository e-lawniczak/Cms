using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
	public interface ITeamMemberRepository : IGenericRepository<TeamMember>
	{
		Task DeleteAsync(int id, ISession session);

	}
	public class TeamMemberRepository :  GenericRepository<TeamMember>, ITeamMemberRepository
	{
		public async Task DeleteAsync(int id, ISession session)
		{
			var entity = await GetByIdAsync(id, session);
			entity.IsDeleted = true;
			await InsertOrUpdateAsync(entity, session);
		}
	}
}
