namespace PizzeriaAPI.Database.Entities
{
    public abstract class Entity
    {
        public virtual int Id { get; set; }
    }
    public abstract class DateEntity : Entity
    {
        public virtual DateTime CreationDate { get; set; }
        public virtual DateTime ModificationDate { get; set; }
    }

    public abstract class ExtendedDateEntity : DateEntity
    {
        public virtual bool IsVisible { get; set; }
        public virtual bool IsDeleted { get; set; }
    }
}
