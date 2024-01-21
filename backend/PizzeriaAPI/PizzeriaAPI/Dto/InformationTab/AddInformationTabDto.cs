using System.ComponentModel.DataAnnotations;

namespace PizzeriaAPI.Dto.InformationTab
{
    public class AddInformationTabDto
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public string Text { get; set; }
        [Required]
        public string ButtonText { get; set; }
        [Required]
        public bool IsVisible { get; set; }
        [Required]
        public int TabSliderId { get; set; }
    }
}
