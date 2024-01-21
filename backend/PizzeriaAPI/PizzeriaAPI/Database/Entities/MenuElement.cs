namespace PizzeriaAPI.Database.Entities
{
    public class MenuElement
    {
        public virtual int MenuElementId { get; set; }
        public virtual string Text { get; set; }
        public virtual string Link { get; set; }
        public virtual DateTime CreationDate { get; set; }
        public virtual DateTime ModificationDate { get; set; }
        public virtual bool IsVisible { get; set; }
        public virtual bool IsDeleted { get; set; }
        public virtual MenuElement? ParentMenuElement { get; set; }
    }
}
