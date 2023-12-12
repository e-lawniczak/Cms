using PizzeriaAPI.Database.Entities;
using static System.Net.Mime.MediaTypeNames;
using System.ComponentModel.DataAnnotations;

namespace PizzeriaAPI.Dto
{
	public class SocialMediaDto : IValidatableObject
	{
		public int? Id { get; set; }
		public string? Name { get; set; }
		public  string? Link { get; set; }
		public bool? IsMain { get; set; }
		public int? TeamMemberId { get; set; }
		public DateTime? CreateDate { get; set; }
		public DateTime? ModificationDate { get; set; }
		public bool? IsVisible { get; set; }
		public IList<int>? PictureIdList { get; set; }
		public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
		{
			var result = new List<ValidationResult>();
			if (Name == null)
				result.Add(new ValidationResult("Name is required"));

			return result;
		}
	}
}
