using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Dto
{
	public class CategoryDto
	{
		public int? Id { get; set; }
		public bool? IsVisible { get; set; }
		public string? Name { get; set; }
		public string? Link { get; set; }
		public IList<int>? ProductIdList { get; set; }
		public IList<int>? PictureIdList { get; set; }
	}
}
