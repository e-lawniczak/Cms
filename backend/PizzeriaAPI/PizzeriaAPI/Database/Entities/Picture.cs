namespace PizzeriaAPI.Database.Entities
{
    public class Picture : DateEntity
    {
        public virtual string Name { get; set; }
        public virtual string? Link { get; set; }
        public virtual string FilePath { get; set; }
        public virtual string ResizedFilePath { get; set; }
        public virtual IList<EntityWithPicture>? EntityWithPictureList { get; set; }
    }
}
