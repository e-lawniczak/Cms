using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Dto
{
	public class PageDto
	{
		public  string? Title { get; set; }
		public  string? Content { get; set; }
		public  int? Id { get; set; }
		public  bool? IsVisible { get; set; }
		public  IList<int>? PictureIdList { get; set; }
	}
}
