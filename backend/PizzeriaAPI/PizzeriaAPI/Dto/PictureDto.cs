namespace PizzeriaAPI.Dto
{
	public class PictureDto
	{
		public int? PictureId { get; set; }
		public string? Name { get; set; }
		public string? Link { get; set; }
		public byte[]? File { get; set; }
		public byte[]? ResizedFile { get; set; }
		public IList<int>? EntityWithPictureIdList { get; set; }
	}
}
