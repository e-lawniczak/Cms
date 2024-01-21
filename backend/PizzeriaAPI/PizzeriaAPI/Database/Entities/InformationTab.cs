namespace PizzeriaAPI.Database.Entities
{
    public class InformationTab
    {
        public virtual int InformationTabId { get; set; }
        public virtual string Title { get; set; }
        public virtual string Text { get; set; }
        public virtual string ButtonText { get; set; }
        public virtual DateTime CreationDate { get; set; }
        public virtual DateTime ModificationDate { get; set; }
        public virtual bool IsVisible { get; set; }
        public virtual bool IsDeleted { get; set; }
        public virtual TabSlider TabSlider { get; set; }

    }
}
