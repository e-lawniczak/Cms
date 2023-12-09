using FluentNHibernate.Mapping;
using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Database.Mapping
{
	public class TabSliderMap : SubclassMap<TabSlider>
	{
		public TabSliderMap() {
			KeyColumn("Id");
			Map(x => x.Title).Not.Nullable();
			HasMany(x => x.InformationTabList)
				.Table("InformationTab");

			Table("TabSlider");
		}
	}
}
