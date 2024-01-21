using FluentNHibernate.Mapping;
using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Database.Mapping
{
    public class MenuElementMap : ClassMap<MenuElement>
    {
        public MenuElementMap()
        {
            Id(x => x.MenuElementId).Not.Nullable().GeneratedBy.Increment();
            Map(x => x.Text).Not.Nullable();
            Map(x => x.Link).Not.Nullable();
            Map(x => x.CreationDate).Not.Nullable();
            Map(x => x.ModificationDate).Not.Nullable();
            Map(x => x.IsVisible).Not.Nullable();
            Map(x => x.IsDeleted).Not.Nullable();

            References(x => x.ParentMenuElement)
                .Column("ParentMenuElementId");

            Table("MenuElement");
        }
    }
}
