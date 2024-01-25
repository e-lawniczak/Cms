namespace PizzeriaAPI.Database.Entities
{
    public class UserToken : Entity
    {
        public virtual string Token { get; set; }
        public virtual DateTime ExpireDate { get; set; }
        public virtual User User { get; set; }
    }
}
