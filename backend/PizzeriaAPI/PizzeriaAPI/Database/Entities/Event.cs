namespace PizzeriaAPI.Database.Entities
{
    public class Event
    {
        public virtual Controller Controller { get; set; }
        public virtual ActionType ActionType { get; set; }
        public virtual int EntityId { get; set; }
        public virtual User User { get; set; }
        public virtual string Message { get; set; }
        public virtual DateTime CreationDate { get; set; }
        public virtual DateTime ModificationTime { get; set; }

        public override int GetHashCode()
        {
            return (Controller.GetHashCode() ^ ActionType.GetHashCode() ^ EntityId.GetHashCode());
        }

        public override bool Equals(object? obj)
        {
            var other = obj as Event;

            if (ReferenceEquals(null, other)) return false;
            if (ReferenceEquals(this, other)) return true;
            return other.Controller == Controller &&
                other.ActionType == ActionType &&
                other.EntityId == EntityId &&
                other.User == User &&
                other.Message == Message &&
                other.CreationDate == CreationDate &&
                other.ModificationTime == ModificationTime;
        }
    }
}
