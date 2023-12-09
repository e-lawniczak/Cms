namespace PizzeriaAPI.Database.Entities
{
	public class Gallery : EntityWithPicture
	{
		public virtual string Name { get; set; }
		public virtual string? MainText { get; set; }
		public virtual string? SubText { get; set; }
	}
}
