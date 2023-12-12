using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Dto
{
	public class MenuElementDto
	{
		public int? MenuElementId { get; set; }
		public string? Text { get; set; }
		public string? Link { get; set; }
		public DateTime? CreateDate { get; set; }
		public DateTime? ModificationDate { get; set; }
		public bool? IsVisible { get; set; }
		public int? ParentMenuElementId { get; set; }
	}
}
