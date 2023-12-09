namespace PizzeriaAPI.Database.Entities
{
	public class Picture
	{
		public virtual int PictureId { get; set; }
		public virtual string Name { get; set; }
		public virtual string Link { get; set; }

		public virtual byte[] File { get; set; }
		public virtual byte[] ResizedFile { get; set; }
		public virtual DateTime CreateDate { get; set; }
		public virtual DateTime ModificationDate { get; set; }
		public virtual IList<EntityWithPicture> EntityWithPictureList { get; set; }
	}
}
