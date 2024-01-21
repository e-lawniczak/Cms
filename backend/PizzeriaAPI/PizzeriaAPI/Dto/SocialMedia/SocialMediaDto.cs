using System.ComponentModel.DataAnnotations;

namespace PizzeriaAPI.Dto.SocialMedia
{
    public class SocialMediaDto : IValidatableObject
    {
        [Required]
        public int Id { get; set; }
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
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var result = new List<ValidationResult>();
            if (Name == null)
                result.Add(new ValidationResult("Name is required"));

            return result;
        }
    }
}
