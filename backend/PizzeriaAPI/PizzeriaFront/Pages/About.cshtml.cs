using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using PizzeriaFrontClient.Models;

namespace PizzeriaFrontClient.Pages
{
    public class AboutModel : PizzeriaPageModel
    {
        public override void OnGet()
        {
            base.OnGet();
            ChildValue = "About";
        }
    }
}
