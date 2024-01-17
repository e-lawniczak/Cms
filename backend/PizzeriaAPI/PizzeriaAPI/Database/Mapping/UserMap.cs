using FluentNHibernate.Mapping;
using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Database.Mapping
{
	public class UserMap : ClassMap<User>
	{
		public UserMap()
		{
			Id(x => x.UserId).Not.Nullable().GeneratedBy.Increment();
			Map(x => x.Email).Not.Nullable();
			Map(x => x.Password).Not.Nullable();
			Map(x => x.CreateDate).Not.Nullable();
			Map(x => x.ModificationDate).Not.Nullable();

			Table("\"User\"");
		}
	}
}
