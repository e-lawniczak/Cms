using System.ComponentModel.DataAnnotations;

namespace PizzeriaAPI.Dto
{
	public class SocialMediaDto : IValidatableObject
	{
		[Key]
		public int Id { get; set; }

		[Required]
		public string Name { get; set; }

		public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
		{
			var result = new List<ValidationResult>();
			if(Name == null)
				result.Add(new ValidationResult("Social Media need name"));
			return result;
		}
	}
}
