namespace PizzeriaAPI.Database.Entities
{
    public class TabSlider : EntityWithPicture
    {
        public virtual string Title { get; set; }
        public virtual IList<InformationTab>? InformationTabList { get; set; }
    }
}
