using FluentNHibernate.Mapping;
using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Database.Mapping
{
	public class EntityWithPictureMap : ClassMap<EntityWithPicture>
	{
		public EntityWithPictureMap()
		{
			Id(x => x.Id).Not.Nullable().GeneratedBy.Increment();
			Map(x => x.CreateDate).Not.Nullable();
			Map(x => x.ModificationDate).Not.Nullable();
			Map(x => x.IsVisible).Not.Nullable();
			Map(x => x.IsDeleted).Not.Nullable();

			HasManyToMany(x => x.PictureList)
				.Cascade.All()
				.Table("EntityPicture")
				.ParentKeyColumn("EntityWithPictureId")
				.ChildKeyColumn("PictureId");

			Table("EntityWithPicture");
		}
	}
}
