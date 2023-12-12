using PizzeriaAPI.Database.Entities;
using System.ComponentModel.DataAnnotations;

namespace PizzeriaAPI.Dto
{
	public class BannerDto : IValidatableObject
	{
		public int? Id { get; set; }
		public string? Title { get; set; }
		public string? Text { get; set; }
		public string? SubText { get; set; }
		public string? Link { get; set; }
		public DateTime? CreateDate { get; set; }
		public DateTime? ModificationDate { get; set; }
		public bool? IsVisible { get; set; }
		public IList<int>? PictureIdList { get; set; }
		public int? SliderId { get; set; }

		public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
		{
			var result = new List<ValidationResult>();
			if (Title == null)
				result.Add(new ValidationResult("Title is required"));
			if (Text == null)
				result.Add(new ValidationResult("Text is required"));
			if (SubText == null)
				result.Add(new ValidationResult("SubText is required"));

			return result;
		}
	}
}
