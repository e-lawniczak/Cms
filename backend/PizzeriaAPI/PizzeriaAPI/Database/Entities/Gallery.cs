using Microsoft.AspNetCore.Components.Web.Virtualization;

namespace PizzeriaAPI.Database.Entities
{
	public class Gallery
	{
		public virtual int GalleryId { get; set; }
		public virtual string GalleryName { get; set; }
		public virtual string MainText { get; set; }
		public virtual string SubText { get; set; }
		public virtual string Link { get; set; }

		public virtual IList<Picture> Pictures { get; set; }
	}
}
