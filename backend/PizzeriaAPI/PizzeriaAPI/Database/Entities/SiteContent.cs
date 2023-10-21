using Microsoft.AspNetCore.Components.Web.Virtualization;

namespace PizzeriaAPI.Database.Entities
{
	public class SiteContent
	{
		public virtual int SiteContentId { get; set; }
		public virtual string MainText { get; set;}
		public virtual string SubText { get; set;}
		public virtual string AltSubText { get; set; }
		public virtual string Link { get; set;}
		public virtual ContentTypeEnum Type { get; set;}
		public virtual PageEnum? Page { get; set;}
		public virtual bool IsVisible { get; set;}
		public virtual Picture MainPicture { get; set;}
		public virtual Picture SubPicture { get; set;}
		public virtual Product Product { get; set;}
		public virtual SiteContent SubSiteContent { get; set;}
	}
}
