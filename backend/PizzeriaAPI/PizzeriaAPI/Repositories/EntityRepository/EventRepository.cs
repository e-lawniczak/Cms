using FluentNHibernate.Data;
using NHibernate.Linq;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Domain;
using PizzeriaAPI.ORM;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories.EntityRepository
{
    public interface IEventRepository
    {
        Task InsertOrUpdate(ControllerEnum controllerEnum, ActionTypeEnum actionTypeEnum, int entityId, int UserId, ISession session);
    }
    public class EventRepository : IEventRepository
    {
        private Dictionary<ControllerEnum, Controller> controllerDict;
        private Dictionary<ActionTypeEnum, ActionType> actionTypeDict;
        private readonly ILogger<EventRepository> logger;
        public EventRepository(ILogger<EventRepository> logger)
        {
            this.logger = logger;
        }

        public async Task InsertOrUpdate(ControllerEnum controllerEnum, ActionTypeEnum actionTypeEnum, int entityId, int UserId, ISession session)
        {
            if (controllerDict == null)
                controllerDict = GetControllers(session);
            if (actionTypeDict == null)
                actionTypeDict = GetActionTypes(session);
            var entity = session.QueryOver<Event>()
                .Where(x => x.EntityId == entityId)
                .And(x => x.Controller.ControllerId == (int)controllerEnum)
                .And(x => x.ActionType.ActionTypeId == (int)actionTypeEnum)
                .SingleOrDefault();

            if (entity == null)
            {
                entity = new Event
                {
                    Controller = controllerDict.GetValueOrDefault(key: controllerEnum),
                    ActionType = actionTypeDict.GetValueOrDefault(key: actionTypeEnum),
                    EntityId = entityId,
                    CreationDate = DateTime.Now,
                };
            }
            try
            {
                entity.ModificationDate = DateTime.Now;
                await session.SaveOrUpdateAsync(entity);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
            }

        }

        private Dictionary<ControllerEnum, Controller> GetControllers(ISession session)
        {
            var controllers = session.QueryOver<Controller>().List();
            var dict = new Dictionary<ControllerEnum, Controller>();
            foreach (var controller in controllers)
            {
                dict.TryAdd(Enum.Parse<ControllerEnum>(controller.Name), controller);
            }
            return dict;
        }
        private Dictionary<ActionTypeEnum, ActionType> GetActionTypes(ISession session)
        {
            var actionTypes = session.QueryOver<ActionType>().List();
            var dict = new Dictionary<ActionTypeEnum, ActionType>();
            foreach (var actionType in actionTypes)
            {
                dict.TryAdd(Enum.Parse<ActionTypeEnum>(actionType.Type), actionType);
            }
            return dict;
        }
    }
}
