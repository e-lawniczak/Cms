using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using PizzeriaFrontAdmin.Models;

namespace PizzeriaFrontAdmin.Pages
{
    public class PicturesModel : PizzeriaPageModel
    {
        public override void OnGet()
        {
            base.OnGet();
            Title = "Pictures";
        }
    }
}
