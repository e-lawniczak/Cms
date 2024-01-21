using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace PizzeriaAPI.Domain
{
    public class ChangePasswordRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [PasswordPropertyText]
        public string Password { get; set; }
        [Required]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }
    }
}
