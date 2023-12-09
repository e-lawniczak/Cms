namespace PizzeriaAPI.Database.Entities
{
    public class User
    {
		public virtual int UserId { get; set; }
        public virtual string? Password {  get; set; }
        public virtual string? Email { get; set; }
		public virtual DateTime CreationDate { get; set; }
		public virtual DateTime ModificationDate { get; set; }

	}
}
