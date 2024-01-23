using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using PizzeriaFrontAdmin.Models;

namespace PizzeriaFrontAdmin.Pages.Account
{
    public class ChangePasswordModel : PizzeriaPageModel
    {
        public override void OnGet()
        {
            base.OnGet();
            Title = "Change password";
        }
    }
}
