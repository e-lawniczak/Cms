using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Dto
{
	public class TeamMemberDto
	{
		public virtual int? Id { get; set; }
		public virtual DateTime? CreateDate { get; set; }
		public virtual DateTime? ModificationDate { get; set; }
		public virtual bool? IsVisible { get; set; }
		public virtual IList<int>? PictureIdList { get; set; }
		public virtual string? FirstName { get; set; }
		public virtual string? LastName { get; set; }
		public virtual int? RoleId { get; set; }
		public virtual IList<int>? SocialMediaIdList { get; set; }

	}
}
