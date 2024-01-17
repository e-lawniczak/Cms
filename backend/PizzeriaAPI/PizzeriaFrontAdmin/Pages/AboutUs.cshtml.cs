using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using PizzeriaFrontAdmin.Models;

namespace PizzeriaFrontAdmin.Pages
{
    public class AboutUsModel : PizzeriaPageModel
    {
        public override void OnGet()
        {
            base.OnGet();
            Title = "About us";
        }
    }
}
