namespace PizzeriaAPI.Database.Entities
{
    public class User : DateEntity
    {
        public virtual string? Password { get; set; }
        public virtual string? Email { get; set; }

    }
}
