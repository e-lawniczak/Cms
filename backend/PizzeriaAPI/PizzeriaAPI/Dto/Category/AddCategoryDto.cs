using System.ComponentModel.DataAnnotations;

namespace PizzeriaAPI.Dto.Category
{
    public class AddCategoryDto
    {
        [Required]
        public bool IsVisible { get; set; }
        [Required]
        public string Name { get; set; }
        public string? Link { get; set; }
        public IList<int>? ProductIdList { get; set; }
        public IList<int>? PictureIdList { get; set; }
    }
}
