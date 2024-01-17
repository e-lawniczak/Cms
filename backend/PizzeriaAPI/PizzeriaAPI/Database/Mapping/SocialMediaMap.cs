using FluentNHibernate.Mapping;
using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Database.Mapping
{
	public class SocialMediaMap : SubclassMap<SocialMedia>
	{
		public SocialMediaMap()
		{
			KeyColumn("Id");
			Map(x => x.Name).Not.Nullable();
			Map(x => x.Link).Not.Nullable();
			Map(x => x.IsMain).Not.Nullable();

			References(x => x.TeamMember)
				.Column("TeamMemberId");

			Table("SocialMedia");
		}
	}
}
