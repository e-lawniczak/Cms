using System.ComponentModel.DataAnnotations;

namespace PizzeriaAPI.Domain
{
	public class AuthenticationRequest
	{
		[Required]
		public string? Email { get; set; }
		[Required]
		public string? Password { get; set; }
	}
}
