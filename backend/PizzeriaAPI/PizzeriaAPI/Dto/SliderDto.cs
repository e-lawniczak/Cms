namespace PizzeriaAPI.Dto
{
	public class SliderDto
	{
		public int? SliderId { get; set; }
		public string? Name { get; set; }


		public bool? IsVisible { get; set; }
		public IList<int> BannerIdList { get; set; }
	}
}
