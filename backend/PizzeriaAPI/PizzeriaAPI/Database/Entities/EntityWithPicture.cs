namespace PizzeriaAPI.Database.Entities
{
    public class EntityWithPicture
    {
        public virtual int Id { get; set; }
        public virtual DateTime CreationDate { get; set; }
        public virtual DateTime ModificationDate { get; set; }
        public virtual bool IsVisible { get; set; }
        public virtual bool IsDeleted { get; set; }
        public virtual IList<Picture>? PictureList { get; set; }
    }
}
