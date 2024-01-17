namespace PizzeriaAPI.Dto
{
	public class TeamMemberDto
	{
		public int? Id { get; set; }
		public bool? IsVisible { get; set; }
		public IList<int>? PictureIdList { get; set; }
		public string? FirstName { get; set; }
		public string? LastName { get; set; }
		public int? RoleId { get; set; }
		public IList<int>? SocialMediaIdList { get; set; }

	}
}
