using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using PizzeriaFrontAdmin.Models;

namespace PizzeriaFrontAdmin.Pages.PageElements
{
    public class RolesModel : PizzeriaPageModel
    {
        public override void OnGet()
        {
            base.OnGet();
            Title = "Roles";
        }
    }
}
