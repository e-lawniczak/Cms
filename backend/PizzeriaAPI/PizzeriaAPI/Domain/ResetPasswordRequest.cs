using System.ComponentModel.DataAnnotations;

namespace PizzeriaAPI.Domain
{
    public class ResetPasswordRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
