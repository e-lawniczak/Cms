using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Dto
{
	public class TestimonialDto
	{
		public int? Id { get; set; }
		public DateTime? CreateDate { get; set; }
		public DateTime? ModificationDate { get; set; }
		public bool? IsVisible { get; set; }
		public bool? IsDeleted { get; set; }
		public string? FirstName { get; set; }
		public string? LastName { get; set; }
		public string? Text { get; set; }
		public int? RoleId { get; set; }
		public IList<int> PictureIdList { get; set; }

	}
}
