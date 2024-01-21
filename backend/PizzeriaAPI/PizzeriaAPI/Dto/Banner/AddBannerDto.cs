using System.ComponentModel.DataAnnotations;

namespace PizzeriaAPI.Dto.Banner
{
    public class AddBannerDto
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public string Text { get; set; }
        public string? SubText { get; set; }
        public string? Link { get; set; }
        public bool? IsVisible { get; set; }
        public IList<int>? PictureIdList { get; set; }
        public int? SliderId { get; set; }
    }
}
