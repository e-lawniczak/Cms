using FluentNHibernate.Mapping;
using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Database.Mapping
{
	public class SiteContentMap : ClassMap<SiteContent>
	{
		public SiteContentMap()
		{
			Id(x => x.SiteContentId).Not.Nullable().GeneratedBy.Increment();
			Map(x => x.MainText);
			Map(x => x.SubText);
			Map(x => x.AltSubText);
			Map(x => x.Link);
			Map(x => x.Type).Not.Nullable();
			Map(x => x.Page);
			Map(x => x.IsVisible).Not.Nullable();

			References(x => x.Product)
			.Column("ProductId");
			References(x => x.MainPicture)
			.Column("MainPictureId");
			References(x => x.SubPicture)
			.Column("SubPictureId");
			References(x => x.SubSiteContent)
			.Column("SubSiteContentId");

			Table("SiteContent");
		}
	}
}
