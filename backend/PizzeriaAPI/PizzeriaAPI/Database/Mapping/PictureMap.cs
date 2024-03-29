﻿using FluentNHibernate.Conventions.AcceptanceCriteria;
using FluentNHibernate.Mapping;
using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Database.Mapping
{
    public class PictureMap : ClassMap<Picture>
    {
        public PictureMap()
        {
            Table("Picture");

            Id(p => p.Id, "PictureId").Not.Nullable().GeneratedBy.Increment();

            Map(p => p.Name).Not.Nullable().Unique();
            Map(p => p.Link).Nullable();
            Map(p => p.FilePath).Not.Nullable();
            Map(p => p.ResizedFilePath).Not.Nullable();
            Map(p => p.CreationDate).Not.Nullable();
            Map(p => p.ModificationDate).Not.Nullable();
            HasManyToMany(x => x.EntityWithPictureList)
               .Table("entitypicture")
               .ParentKeyColumn("pictureid")
               .ChildKeyColumn("entitywithpictureid")
               .Inverse();
        }
    }
}
