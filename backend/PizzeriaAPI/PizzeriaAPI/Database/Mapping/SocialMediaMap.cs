using FluentNHibernate.Mapping;
using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Database.Mapping
{
	public class SocialMediaMap : ClassMap<SocialMedia>
	{
		public SocialMediaMap()
		{
			Id(x => x.Id).Not.Nullable().GeneratedBy.Increment();
			Map(x => x.Name).Not.Nullable();

			Table("SocialMedia");
		}
	}
}
