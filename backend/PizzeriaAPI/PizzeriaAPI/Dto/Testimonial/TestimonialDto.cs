using System.ComponentModel.DataAnnotations;

namespace PizzeriaAPI.Dto.Testimonial
{
    public class TestimonialDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public bool IsVisible { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Text { get; set; }
        [Required]
        public int RoleId { get; set; }
        public IList<int>? PictureIdList { get; set; }

    }
}
