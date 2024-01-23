using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace PizzeriaAPI.Domain
{
    public class ChangePasswordRequest
    {
        [Required]
        [PasswordPropertyText]
        public string Password { get; set; }
        [Required]
        [Compare("Password")]
        [PasswordPropertyText]
        public string ConfirmPassword { get; set; }
    }
}
