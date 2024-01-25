using NHibernate.Criterion;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Domain;
using PizzeriaAPI.Repositories.EntityRepository;
using PizzeriaAPI.Repositories.ExtendedBaseEntityRepositories;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories.EntityWithPictureRepositories
{
    public interface IEntityWithPictureRepository<T> : IExtendedDateEntityRepository<T> where T : EntityWithPicture
    { }
    public abstract class EntityWithPictureRepository<T> : ExtendedDateEntityRepository<T> where T : EntityWithPicture
    {

        public EntityWithPictureRepository(IEventRepository eventRepository, ControllerEnum controllerEnum) : base(eventRepository, controllerEnum)
        {
        }

        public new virtual async Task DeleteAsync(T entity, ISession session)
        {
            if (entity == null)
                return;
            entity.PictureList?.Clear();
            await base.DeleteAsync(entity, session);
        }
        
    }
}
