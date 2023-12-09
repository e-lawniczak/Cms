using FluentNHibernate.Mapping;
using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Database.Mapping
{
	public class EventMap : ClassMap<Event>
	{
		public EventMap()
		{
			CompositeId()
				.KeyReference(x => x.Controller)
				.KeyReference(x => x.ActionType)
				.KeyProperty(x => x.EntityId);

			Map(x => x.Message);
			Map(x => x.CreationDate).Not.Nullable();
			Map(x => x.ModificationTime).Not.Nullable();

			References(x => x.User)
				.Column("UserId");

			Table("Event");
		}
	}
}
