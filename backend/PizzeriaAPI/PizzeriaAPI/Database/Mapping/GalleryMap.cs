using FluentNHibernate.Mapping;
using NHibernate.Mapping;
using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Database.Mapping
{
	public class GalleryMap : ClassMap<Gallery>
	{
		public GalleryMap()
		{
			Id(x => x.GalleryId).Not.Nullable().GeneratedBy.Increment();
			Map(x => x.GalleryName).Not.Nullable();
			Map(x => x.MainText).Not.Nullable();
			Map(x => x.SubText);
			Map(x => x.Link);

			HasManyToMany(x => x.Pictures)
				.Cascade.All()
				.Table("GalleryPicture");

			Table("Gallery");
		}
	}
}
