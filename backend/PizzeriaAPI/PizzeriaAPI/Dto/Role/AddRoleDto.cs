using System.ComponentModel.DataAnnotations;

namespace PizzeriaAPI.Dto.Role
{
    public class AddRoleDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public bool IsVisible { get; set; }
        public IList<int>? TeamMemberIdList { get; set; }
        public IList<int>? TestimonialIdList { get; set; }
    }
}
