namespace PizzeriaAPI.Database.Entities
{
    public class InformationTab : ExtendedDateEntity
    {
        public virtual string Title { get; set; }
        public virtual string Text { get; set; }
        public virtual string ButtonText { get; set; }
        public virtual TabSlider? TabSlider { get; set; }

    }
}
