namespace PizzeriaAPI.Database.Entities
{
    public class UserToken
    {
        public virtual int UserTokenId { get; set; }
        public virtual string Token { get; set; }
        public virtual DateTime ExpireDate { get; set; }
        public virtual User User { get; set; }
    }
}
