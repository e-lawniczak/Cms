using System.ComponentModel.DataAnnotations;

namespace PizzeriaAPI.Domain
{
    public class ForgotPasswordRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
