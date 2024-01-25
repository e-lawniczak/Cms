using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
    public interface IMenuElementRepository : IGenericRepository<MenuElement>
    {
        Task DeleteAsync(int id, ISession session);
    }
    public class MenuElementRepository : GenericRepository<MenuElement>, IMenuElementRepository
    {
        public MenuElementRepository(IEventRepository eventRepository) : base(eventRepository)
        {
        }
        public new async Task<IList<MenuElement>> GetAllAsync(ISession session)
        {
            MenuElement menuElementAlias = null;
            var result = await session.QueryOver(() => menuElementAlias)
                 .Where(() => menuElementAlias.IsDeleted == false)
                 .OrderBy(() => menuElementAlias.MenuElementId).Asc
                 .ListAsync<MenuElement>();
            return result.Select(menuElement =>
            {
                menuElement.ParentMenuElement = (!menuElement.ParentMenuElement?.IsDeleted ?? false) ? menuElement.ParentMenuElement : null;
                return menuElement;
            }).ToList();
        }
        public new async Task<IList<MenuElement>> GetVisibleAsync(ISession session)
        {
            MenuElement menuElementAlias = null;
            var result = await session.QueryOver(() => menuElementAlias)
                 .Where(() => menuElementAlias.IsDeleted == false)
                 .And(() => menuElementAlias.IsVisible == true)
                 .OrderBy(() => menuElementAlias.MenuElementId).Asc
                 .ListAsync<MenuElement>();
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

            entity.IsDeleted = true;
            entity.ParentMenuElement = null;
            var children = await session.QueryOver<MenuElement>()
                .Where(x => x.ParentMenuElement.MenuElementId == id)
                .ListAsync();

            foreach (var child in children)
            {
                child.ParentMenuElement = null;
                await UpdateAsync(child, session);
            }
            await UpdateAsync(entity, session);
        }

        public override async Task InsertAsync(MenuElement entity, ISession session)
        {
            entity.CreationDate = DateTime.Now;
            entity.ModificationDate = DateTime.Now;
            await base.InsertAsync(entity, session);
        }

        public override async Task UpdateAsync(MenuElement entity, ISession session)
        {
            entity.ModificationDate = DateTime.Now;
            await base.UpdateAsync(entity, session);
        }
    }
}
