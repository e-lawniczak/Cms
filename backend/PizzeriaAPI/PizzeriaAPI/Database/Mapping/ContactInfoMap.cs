using FluentNHibernate.Mapping;
using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Database.Mapping
{
	public class ContactInfoMap : SubclassMap<ContactInfo>
	{
		public ContactInfoMap()
		{
			KeyColumn("Id");
			Map(x => x.Text).Not.Nullable();

			Table("ContactInfo");
		}
	}
}
