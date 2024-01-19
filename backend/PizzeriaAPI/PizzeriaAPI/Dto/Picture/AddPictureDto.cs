using System.ComponentModel.DataAnnotations;

namespace PizzeriaAPI.Dto.Picture
{
	public class AddPictureDto
	{
		[Required]
		public string Name { get; set; }
		public string? Link { get; set; }
		[Required]
		public IFormFile Picture { get; set; }
	}
}
