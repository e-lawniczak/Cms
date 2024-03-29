﻿using FluentNHibernate.Mapping;
using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Database.Mapping
{
    public class SliderMap : ClassMap<Slider>
    {
        public SliderMap()
        {
            Id(x => x.Id, "SliderId").Not.Nullable().GeneratedBy.Increment();
            Map(x => x.Name).Not.Nullable().Unique();
            Map(x => x.CreationDate).Not.Nullable();
            Map(x => x.ModificationDate).Not.Nullable();
            Map(x => x.IsVisible).Not.Nullable();
            Map(x => x.IsDeleted).Not.Nullable();

            HasMany(x => x.BannerList)
                .Table("Banner");

            Table("Slider");
        }
    }
}
