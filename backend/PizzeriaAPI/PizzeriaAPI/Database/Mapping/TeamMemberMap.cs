using FluentNHibernate.Mapping;
using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Database.Mapping
{
    public class TeamMemberMap : SubclassMap<TeamMember>
    {
        public TeamMemberMap()
        {
            KeyColumn("Id");
            Map(x => x.FirstName).Not.Nullable();
            Map(x => x.LastName).Not.Nullable();

            References(x => x.Role)
                .Column("RoleId");
            HasMany(x=>x.SocialMediaList)
                .Table("SocialMedia")
                .Cascade.SaveUpdate();

            Table("TeamMember");
        }
    }
}
