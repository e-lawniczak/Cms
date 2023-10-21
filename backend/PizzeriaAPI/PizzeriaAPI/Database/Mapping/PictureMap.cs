using FluentNHibernate.Mapping;
using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Database.Mapping
{
	public class PictureMap : ClassMap<Picture>
	{
		public PictureMap()
		{
			Id(x => x.PictureId).Not.Nullable().GeneratedBy.Increment();
			Map(x => x.PictureName).Not.Nullable();
			Map(x => x.File).Not.Nullable();
			Map(x => x.CreateDate).Not.Nullable();

			HasManyToMany(x => x.Galleries)
				.Cascade.All()
				.Table("GalleryPicture");

			Table("Picture");
		}
	}
}
