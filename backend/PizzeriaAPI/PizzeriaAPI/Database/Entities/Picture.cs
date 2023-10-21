namespace PizzeriaAPI.Database.Entities
{
	public class Picture
	{
		public virtual int PictureId { get; set; }
		public virtual string PictureName { get; set; }
		public virtual Byte[] File { get; set; }
		public virtual DateTime CreateDate { get; set; }

		public virtual IList<Gallery> Galleries { get; set; }
	}
}
