using System.ComponentModel.DataAnnotations;

namespace PizzeriaAPI.Database.Entities
{
	public abstract class EntityWithPicture
	{
		public virtual int Id { get; set; }
		public virtual DateTime CreateDate { get; set; }
		public virtual DateTime ModificationDate { get; set; }
		public virtual bool IsVisible { get; set; }
		public virtual bool IsDeleted { get; set; }
		public virtual IList<Picture> PictureList { get; set; }
	}
}
