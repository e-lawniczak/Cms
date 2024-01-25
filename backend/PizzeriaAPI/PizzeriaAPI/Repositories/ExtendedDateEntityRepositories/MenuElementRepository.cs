using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Repositories.EntityRepository;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories.ExtendedBaseEntityRepositories
{
    public interface IMenuElementRepository : IExtendedDateEntityRepository<MenuElement>
    {
        Task DeleteAsync(int id, ISession session);
    }
    public class MenuElementRepository : ExtendedDateEntityRepository<MenuElement>, IMenuElementRepository
    {
        public MenuElementRepository(IEventRepository eventRepository) : base(eventRepository, Domain.ControllerEnum.MenuElement)
        {
        }
        public override async Task<IList<MenuElement>> GetAllAsync(ISession session)
        {
            var result = await base.GetAllAsync(session);
            return result.Select(menuElement =>
            {
                menuElement.ParentMenuElement = !menuElement.ParentMenuElement?.IsDeleted ?? false ? menuElement.ParentMenuElement : null;
                return menuElement;
            }).ToList();
        }
        public override async Task<IList<MenuElement>> GetVisibleAsync(ISession session)
        {
            var result = await base.GetVisibleAsync(session);
            return result.Select(menuElement =>
            {
                menuElement.ParentMenuElement = (!menuElement.ParentMenuElement?.IsDeleted ?? false) &&
                (menuElement.ParentMenuElement?.IsVisible ?? true) ? menuElement.ParentMenuElement : null;
                return menuElement;
            }).ToList();
        }
        public async Task DeleteAsync(int id, ISession session)
        {
            var entity = await GetByIdAsync(id, session);
            if (entity == null) return;

            entity.ParentMenuElement = null;
            var children = await session.QueryOver<MenuElement>()
                .Where(x => x.ParentMenuElement.Id == id)
                .ListAsync();

            foreach (var child in children)
            {
                child.ParentMenuElement = null;
                await base.UpdateAsync(child, session);
            }
            await base.DeleteAsync(entity, session);
        }
    }
}
