namespace PizzeriaAPI.Database.Entities
{
	public class Page : EntityWithPicture
	{
		public virtual string Title { get; set; }
		public virtual string Content { get; set; }
	}
}
