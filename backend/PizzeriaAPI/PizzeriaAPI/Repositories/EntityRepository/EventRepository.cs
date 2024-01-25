using FluentNHibernate.Data;
using NHibernate.Criterion;
using NHibernate.Linq;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Domain;
using PizzeriaAPI.ORM;
using PizzeriaAPI.Repositories.BaseEntityRepositories;
using PizzeriaAPI.Security;
using System.IdentityModel.Tokens.Jwt;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories.EntityRepository
{
    public interface IEventRepository
    {
        Task InsertOrUpdate(ControllerEnum controllerEnum, ActionTypeEnum actionTypeEnum, int entityId, int UserId, ISession session);
        void Initialize(ISession session);
    }
    public class EventRepository : IEventRepository
    {
        private Dictionary<ControllerEnum, Controller> controllerDict;
        private Dictionary<ActionTypeEnum, ActionType> actionTypeDict;
        private readonly ILogger<EventRepository> logger;
        private readonly IHttpContextAccessor httpContextAccessor;
        public EventRepository(ILogger<EventRepository> logger, IHttpContextAccessor httpContextAccessor)
        {
            this.logger = logger;
            this.httpContextAccessor = httpContextAccessor;
        }
        public void Initialize(ISession session)
        {
            controllerDict = GetControllers(session);
            actionTypeDict = GetActionTypes(session);
        }

        public async Task InsertOrUpdate(ControllerEnum controllerEnum, ActionTypeEnum actionTypeEnum, int entityId, int UserId, ISession session)
        {
            var entity = session.QueryOver<Event>()
                .Where(x => x.EntityId == entityId)
                .And(x => x.Controller.ControllerId == (int)controllerEnum)
                .And(x => x.ActionType.ActionTypeId == (int)actionTypeEnum)
                .SingleOrDefault();
            User? user = await GetUser(session);
           
            var controller = controllerDict?.GetValueOrDefault(key: controllerEnum);
            var actionType = actionTypeDict?.GetValueOrDefault(key: actionTypeEnum);
            if(controller == null|| actionType == null)
            {
                logger.LogError($"Controller or ActionType not found. Controller: {controllerEnum}, ActionType: {actionTypeEnum}");
                return;
            }
            if (entity == null)
            {
                entity = new Event
                {
                    Controller = controller,
                    ActionType = actionType,
                    User = user,
                    EntityId = entityId,
                    CreationDate = DateTime.Now,
                };
            }
            try
            {
                entity.ModificationDate = DateTime.Now;
                if(entity.User != user) entity.User = user;
                await session.SaveOrUpdateAsync(entity);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
            }

        }
        private async Task<User?> GetUser(ISession session)
        {
            try
            {
                var token = httpContextAccessor.HttpContext?.Request.Headers["Authorization"].ToString().Split(" ").LastOrDefault();
                if (token == null) return null;
                var handler = new JwtSecurityTokenHandler();
                var jsonToken = handler.ReadToken(token) as JwtSecurityToken;
                string? email = jsonToken?.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Email)?.Value;
                if(email == null) return null;
                return await session.QueryOver<User>()
                    .Where(x => x.Email == email.ToLower())
                    .SingleOrDefaultAsync();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                return null;
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
