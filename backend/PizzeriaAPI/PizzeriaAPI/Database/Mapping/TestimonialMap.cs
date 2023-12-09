using FluentNHibernate.Mapping;
using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Database.Mapping
{
	public class TestimonialMap : SubclassMap<Testimonial>
	{
		public TestimonialMap()
		{

			KeyColumn("Id");
			Map(x => x.FirstName).Not.Nullable();
			Map(x => x.LastName).Not.Nullable();
			Map(x => x.Text).Not.Nullable();

			References(x => x.Role)
				.Column("RoleId");

			Table("Testimonial");
		}
	}
}
