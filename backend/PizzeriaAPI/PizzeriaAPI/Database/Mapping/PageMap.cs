using FluentNHibernate.Mapping;
using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Database.Mapping
{
	public class PageMap : SubclassMap<Page>
	{
		public PageMap() {
			KeyColumn("Id");
			Map(x => x.Title);
			Map(x => x.Content);

			Table("Page");
			
		}
	}
}
