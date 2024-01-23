using System.ComponentModel.DataAnnotations;

namespace PizzeriaAPI.Dto.TeamMember
{
    public class TeamMemberDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public bool IsVisible { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public int? RoleId { get; set; }
        public IList<int>? SocialMediaIdList { get; set; }
        public IList<int>? PictureIdList { get; set; }
    }
}
