namespace PizzeriaAPI.Database.Entities
{
	public class Testimonial : EntityWithPicture
	{
		public virtual string FirstName { get; set; }
		public virtual string LastName { get; set; }
		public virtual string Text { get; set; }
		public virtual Role Role { get; set; }
	}
}
