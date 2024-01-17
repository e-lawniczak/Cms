using System.ComponentModel.DataAnnotations;

namespace PizzeriaAPI.Domain
{
	public class RegistrationRequest
	{
		[Required]
		public string? Email { get; set; }
		[Required]
		public string? Password { get; set; }
	}
}
