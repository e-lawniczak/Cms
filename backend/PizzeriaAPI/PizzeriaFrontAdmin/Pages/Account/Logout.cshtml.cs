using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using PizzeriaFrontAdmin.Models;

namespace PizzeriaFrontAdmin.Pages.Account
{
    public class LogoutModel : PizzeriaPageModel
    {
        public override void OnGet()
        {
            base.LogOut();
            Title = "Logout";
            Response.Redirect("/");
        }
    }
}
