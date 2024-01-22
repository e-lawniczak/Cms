using System.ComponentModel.DataAnnotations;

namespace PizzeriaAPI.Dto.Picture
{
    public class PictureDto
    {
        [Required]
        public int PictureId { get; set; }
        [Required]
        [FileExtensions(Extensions = "jpg,jpeg,png")]
        public string Name { get; set; }
        public string? Link { get; set; }
        [Required]
        public IFormFile Picture { get; set; }
        public IList<int>? EntityWithPictureIdList { get; set; }
    }
}
