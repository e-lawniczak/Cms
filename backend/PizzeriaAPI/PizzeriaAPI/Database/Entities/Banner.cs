namespace PizzeriaAPI.Database.Entities
{
    public class Banner : EntityWithPicture
    {
        public virtual string Title { get; set; }
        public virtual string Text { get; set; }
        public virtual string? SubText { get; set; }
        public virtual string? Link { get; set; }
        public virtual Slider? Slider { get; set; }
    }
}
