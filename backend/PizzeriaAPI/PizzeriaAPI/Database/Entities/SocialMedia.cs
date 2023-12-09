namespace PizzeriaAPI.Database.Entities
{
	public class SocialMedia : EntityWithPicture
	{
		public virtual string Name { get;set;}
		public virtual string Link { get;set;}
		public virtual bool IsMain { get; set;}
		public virtual TeamMember TeamMember { get; set;}
	}
}
