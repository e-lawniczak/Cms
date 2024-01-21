using FluentNHibernate.Mapping;
using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Database.Mapping
{
    public class ActionTypeMap : ClassMap<ActionType>
    {
        public ActionTypeMap()
        {
            Id(x => x.ActionTypeId).Not.Nullable().GeneratedBy.Increment();
            Map(x => x.Type).Not.Nullable();

            Table("ActionType");
        }
    }
}
