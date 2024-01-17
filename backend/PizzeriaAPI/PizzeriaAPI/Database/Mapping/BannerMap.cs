using FluentNHibernate.Mapping;
using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Database.Mapping
{
	public class BannerMap : SubclassMap<Banner>
	{
		public BannerMap()
		{
			KeyColumn("Id");
			Map(x => x.Title).Not.Nullable();
			Map(x => x.Text).Not.Nullable();
			Map(x => x.SubText);
			Map(x => x.Link);

			References(x => x.Slider)
				.Column("SliderId").Nullable().Cascade.None();

			Table("Banner");
		}
	}
}
