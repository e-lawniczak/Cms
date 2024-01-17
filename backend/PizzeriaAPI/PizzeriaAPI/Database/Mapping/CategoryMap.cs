using FluentNHibernate.Mapping;
using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Database.Mapping
{
	public class CategoryMap : SubclassMap<Category>
	{
		public CategoryMap()
		{
			KeyColumn("Id");
			Map(x => x.Name).Not.Nullable();
			Map(x => x.Link);

			HasMany(x => x.ProductList)
				.Table("Product");

			Table("Category");
		}
	}
}
