namespace PizzeriaAPI.Database.Entities
{
    public class Slider
    {
        public virtual int SliderId { get; set; }
        public virtual string Name { get; set; }
        public virtual DateTime CreationDate { get; set; }
        public virtual DateTime ModificationDate { get; set; }
        public virtual bool IsVisible { get; set; }
        public virtual bool IsDeleted { get; set; }
        public virtual IList<Banner>? BannerList { get; set; }
    }
}
