namespace PizzeriaAPI.Database.Entities
{
    public class EntityWithPicture : ExtendedDateEntity
    {
        public virtual IList<Picture>? PictureList { get; set; }
    }
}
