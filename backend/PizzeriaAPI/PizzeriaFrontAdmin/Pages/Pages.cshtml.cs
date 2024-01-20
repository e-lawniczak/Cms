using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using PizzeriaFrontAdmin.Models;

namespace PizzeriaFrontAdmin.Pages
{
    public class PagesModel : PizzeriaPageModel
    {
        public override void OnGet()
        {
            base.OnGet();
            Title = "Pages";
        }
    }
}
