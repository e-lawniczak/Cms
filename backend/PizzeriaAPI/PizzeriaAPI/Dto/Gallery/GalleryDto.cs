using System.ComponentModel.DataAnnotations;

namespace PizzeriaAPI.Dto.Gallery
{
    public class GalleryDto
    {
        [Required]
        public string Name { get; set; }
        public string? MainText { get; set; }
        public string? SubText { get; set; }
        [Required]
        public int Id { get; set; }
        [Required]
        public bool IsVisible { get; set; }
        public IList<int>? PictureIdList { get; set; }
    }
}
