namespace PizzeriaAPI.Dto
{
	public class TabSliderDto
	{

		public int? Id { get; set; }
		public bool? IsVisible { get; set; }
		public IList<int>? PictureIdList { get; set; }
		public string? Title { get; set; }
		public IList<int>? InformationTabIdList { get; set; }

	}
}
