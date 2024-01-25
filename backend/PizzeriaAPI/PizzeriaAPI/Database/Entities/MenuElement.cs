namespace PizzeriaAPI.Database.Entities
{
    public class MenuElement: ExtendedDateEntity
    {
        public virtual string Text { get; set; }
        public virtual string Link { get; set; }
        public virtual MenuElement? ParentMenuElement { get; set; }
    }
}
