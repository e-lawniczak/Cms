using System.ComponentModel.DataAnnotations;

namespace PizzeriaAPI.Dto.Gallery
{
    public class AddGalleryDto
    {
        [Required]
        public string Name { get; set; }
        public string? MainText { get; set; }
        public string? SubText { get; set; }
        [Required]
        public bool IsVisible { get; set; }
        public IList<int>? PictureIdList { get; set; }
    }
}
