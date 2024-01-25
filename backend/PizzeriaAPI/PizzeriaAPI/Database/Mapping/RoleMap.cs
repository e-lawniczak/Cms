using FluentNHibernate.Mapping;
using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Database.Mapping
{
    public class RoleMap : ClassMap<Role>
    {
        public RoleMap()
        {
            Id(x => x.Id,"RoleId").Not.Nullable().GeneratedBy.Increment();
            Map(x => x.Name).Not.Nullable();
            Map(x => x.CreationDate).Not.Nullable();
            Map(x => x.ModificationDate).Not.Nullable();
            Map(x => x.IsVisible).Not.Nullable();
            Map(x => x.IsDeleted).Not.Nullable();

            HasMany(x => x.TeamMemberList)
             .Table("TeamMember")
             .Cascade.SaveUpdate();
            HasMany(x => x.TestimonialList)
            .Table("Testimonial")
            .Cascade.SaveUpdate();

            Table("Role");
        }
    }
}
