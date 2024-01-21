using System.ComponentModel.DataAnnotations;

namespace PizzeriaAPI.Dto.Page
{
    public class PageDto
    {
        public string? Title { get; set; }
        public string? Content { get; set; }
        [Required]
        public int Id { get; set; }
        [Required]
        public bool IsVisible { get; set; }
        public IList<int>? PictureIdList { get; set; }
    }
}
