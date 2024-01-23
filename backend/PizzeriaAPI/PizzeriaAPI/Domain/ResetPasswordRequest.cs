using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace PizzeriaAPI.Domain
{
    public class ResetPasswordRequest
    {
        [Required]
        public string ResetToken { get; set; }
        [Required]
        [PasswordPropertyText]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }
        [Required]
        [PasswordPropertyText]

        public string Password { get; set; }
    }
}
