using FluentNHibernate.Mapping;
using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Database.Mapping
{
	public class KeyValueMap : ClassMap<KeyValue>
	{
		public KeyValueMap()
		{
			Id(x => x.Id).Not.Nullable().GeneratedBy.Increment();
			Map(x => x.Key).Not.Nullable();
			Map(x => x.Value).Not.Nullable();

			Table("KeyValue");
		}
	}
}
