namespace PizzeriaAPI.Database.Entities
{
    public class Slider : ExtendedDateEntity
    {
        public virtual string Name { get; set; }
        public virtual IList<Banner>? BannerList { get; set; }
    }
}
