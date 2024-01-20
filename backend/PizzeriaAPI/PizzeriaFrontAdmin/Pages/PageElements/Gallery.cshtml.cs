using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using PizzeriaFrontAdmin.Models;

namespace PizzeriaFrontAdmin.Pages
{
    public class GalleryModel : PizzeriaPageModel
    {
        public override void OnGet()
        {
            base.OnGet();
            Title = "Gallery";
        }
    }
}
