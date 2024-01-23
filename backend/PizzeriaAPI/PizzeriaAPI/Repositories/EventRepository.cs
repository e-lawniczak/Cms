using NHibernate.Linq;
using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
    public interface IEventRepository : IGenericRepository<Event>
    {
        Task InsertOrUpdate(Controller controller, ActionType actionType, int entityId, int UserId, ISession session);
    }
    public class EventRepository : GenericRepository<Event>, IEventRepository
    {
       
        public async Task InsertOrUpdate(Controller controller, ActionType actionType, int entityId, int UserId, ISession session)
        {
            //session.GetAsync<Event>(controlle)
            var entity = new Event
            {
                Controller = controller,
                ActionType = actionType,
                EntityId = entityId,
                CreationDate = DateTime.Now,
                ModificationTime = DateTime.Now,
            };
            await session.SaveOrUpdateAsync(entity);
        }
    }
}
