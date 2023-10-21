using FluentNHibernate.Mapping;
using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Database.Mapping
{
	public class ProductMap : ClassMap<Product>
	{
		public ProductMap()
		{
			Id(x => x.ProductId).Not.Nullable().GeneratedBy.Increment();
			Map(x => x.ProductName).Not.Nullable();
			Map(x => x.ProductPrice).Not.Nullable();
			Map(x => x.ProductDescription);
			Map(x => x.ProductDiscountPrice);

			Table("Product");
		}
	}
}