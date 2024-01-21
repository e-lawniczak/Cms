using System.ComponentModel.DataAnnotations;

namespace PizzeriaAPI.Dto.Slider
{
    public class SliderDto
    {
        [Required]
        public int SliderId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public bool IsVisible { get; set; }
        public IList<int>? BannerIdList { get; set; }
    }
}
