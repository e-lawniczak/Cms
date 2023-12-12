using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Dto
{
	public class SliderDto
	{
		public int? SliderId { get; set; }
		public string? Name { get; set; }
		public DateTime? CreateDate { get; set; }
		public DateTime? ModificationDate { get; set; }
		public bool? IsVisible { get; set; }
		public bool? IsDeleted { get; set; }
		public IList<int> BannerIdList { get; set; }
	}
}
