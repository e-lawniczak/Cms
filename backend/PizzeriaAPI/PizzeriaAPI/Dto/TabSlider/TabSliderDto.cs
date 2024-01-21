using System.ComponentModel.DataAnnotations;

namespace PizzeriaAPI.Dto.TabSlider
{
    public class TabSliderDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public bool IsVisible { get; set; }
        [Required]
        public string Title { get; set; }
        public IList<int>? InformationTabIdList { get; set; }
        public IList<int>? PictureIdList { get; set; }
    }
}
