namespace PizzeriaAPI.Dto
{
	public class GalleryDto
	{
		public string? Name { get; set; }
		public string? MainText { get; set; }
		public string? SubText { get; set; }
		public int? Id { get; set; }
		public bool? IsVisible { get; set; }
		public IList<int>? PictureIdList { get; set; }
	}
}
