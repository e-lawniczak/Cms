using FluentNHibernate.Mapping;
using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Database.Mapping
{
    public class EventMap : ClassMap<Event>
    {
        public EventMap()
        {
            CompositeId()
                .KeyReference(x => x.Controller, "ControllerId")
                .KeyReference(x => x.ActionType, "ActionTypeId")
                .KeyProperty(x => x.EntityId);

            Map(x => x.Message);
            Map(x => x.CreationDate).Not.Nullable();
            Map(x => x.ModificationDate).Not.Nullable();

            References(x => x.User)
                .Column("UserId");

            Table("Event");
        }
    }
}
