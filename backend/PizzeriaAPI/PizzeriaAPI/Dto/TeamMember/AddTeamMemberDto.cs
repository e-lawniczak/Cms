using System.ComponentModel.DataAnnotations;

namespace PizzeriaAPI.Dto.TeamMember
{
    public class AddTeamMemberDto
    {
        [Required]
        public bool IsVisible { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public int RoleId { get; set; }
        public IList<int>? SocialMediaIdList { get; set; }
        public IList<int>? PictureIdList { get; set; }
    }
}
