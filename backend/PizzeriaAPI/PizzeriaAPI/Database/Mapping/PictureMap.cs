using FluentNHibernate.Mapping;
using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Database.Mapping
{
	public class PictureMap : ClassMap<Picture>
	{
		public PictureMap()
		{
			Id(x => x.PictureId).Not.Nullable().GeneratedBy.Increment();
			Map(x => x.Name).Not.Nullable();
			Map(x => x.FilePath).Not.Nullable();
			Map(x => x.ResizedFilePath).Not.Nullable();
			Map(x => x.Link);
			Map(x => x.CreateDate).Not.Nullable();
			Map(x => x.ModificationDate).Not.Nullable();

			HasManyToMany(x => x.EntityWithPictureList)
				.Cascade.All()
				.Table("EntityPicture")
				.ParentKeyColumn("PictureId")
				.ChildKeyColumn("EntityWithPictureId");

			Table("Picture");
		}
	}
}
