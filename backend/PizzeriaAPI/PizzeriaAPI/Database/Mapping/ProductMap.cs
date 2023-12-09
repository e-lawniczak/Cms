using FluentNHibernate.Mapping;
using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Database.Mapping
{
	public class ProductMap : SubclassMap<Product>
	{
		public ProductMap()
		{
			KeyColumn("Id");
			Map(x => x.Name).Not.Nullable();
			Map(x => x.Price).Not.Nullable();
			Map(x => x.Description);
			Map(x => x.DiscountPrice);
			Map(x => x.Score);
			Map(x => x.IsRecommended).Not.Nullable();

			References(x => x.Category)
				.Column("CategoryId");

			Table("Product");
		}
	}
}