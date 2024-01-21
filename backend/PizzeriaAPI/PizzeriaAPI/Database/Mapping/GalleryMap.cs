using FluentNHibernate.Mapping;
using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Database.Mapping
{
    public class GalleryMap : SubclassMap<Gallery>
    {
        public GalleryMap()
        {
            KeyColumn("Id");
            Map(x => x.Name).Not.Nullable().Unique();
            Map(x => x.MainText);
            Map(x => x.SubText);

            Table("Gallery");
        }
    }
}
