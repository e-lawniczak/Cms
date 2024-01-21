using FluentNHibernate.Mapping;
using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Database.Mapping
{
    public class InformationTabMap : ClassMap<InformationTab>
    {
        public InformationTabMap()
        {
            Id(x => x.InformationTabId).Not.Nullable().GeneratedBy.Increment();
            Map(x => x.Title).Not.Nullable().Unique();
            Map(x => x.Text).Not.Nullable();
            Map(x => x.ButtonText).Not.Nullable();
            Map(x => x.CreationDate).Not.Nullable();
            Map(x => x.ModificationDate).Not.Nullable();
            Map(x => x.IsVisible).Not.Nullable();
            Map(x => x.IsDeleted).Not.Nullable();

            References(x => x.TabSlider)
                .Column("TabSliderId");

            Table("Informationtab");
        }
    }
}
