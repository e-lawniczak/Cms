using FluentNHibernate.Mapping;
using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Database.Mapping
{
    public class UserTokenMap : ClassMap<UserToken>
    {
        public UserTokenMap()
        {
            Id(x => x.Id, "UserTokenId").Not.Nullable().GeneratedBy.Increment();
            Map(x => x.Token).Not.Nullable();
            Map(x => x.ExpireDate).Not.Nullable();
            References(x => x.User).Column("UserId").Not.Nullable().Not.LazyLoad();

            Table("UserToken");
        }
    }
}
