using FluentNHibernate.Mapping;
using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Database.Mapping
{
    public class ProductMap : SubclassMap<Product>
    {
        public ProductMap()
        {
            KeyColumn("Id");
            Map(x => x.Name).Not.Nullable().Unique();
            Map(x => x.Price).Not.Nullable();
            Map(x => x.Description).Nullable();
            Map(x => x.DiscountPrice).Nullable();
            Map(x => x.Score).Nullable();
            Map(x => x.IsRecommended).Not.Nullable();

            References(x => x.Category)
                .Column("CategoryId");

            Table("Product");
        }
    }
}