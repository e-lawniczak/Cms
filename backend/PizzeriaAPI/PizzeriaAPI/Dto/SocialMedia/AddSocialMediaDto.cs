using System.ComponentModel.DataAnnotations;

namespace PizzeriaAPI.Dto.SocialMedia
{
    public class AddSocialMediaDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Link { get; set; }
        [Required]
        public bool IsMain { get; set; }
        public int? TeamMemberId { get; set; }
        [Required]
        public bool IsVisible { get; set; }
        public IList<int>? PictureIdList { get; set; }
    }
}
