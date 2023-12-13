using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Dto
{
	public class ContactInfoDto
	{
		public int? Id { get; set; }
		public bool? IsVisible { get; set; }
		public IList<int>? PictureIdList { get; set; }
		public string? Text { get; set; }
	}
}
