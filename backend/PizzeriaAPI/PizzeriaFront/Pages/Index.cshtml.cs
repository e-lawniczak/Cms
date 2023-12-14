using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using PizzeriaFrontClient.Models;

namespace PizzeriaFrontClient.Pages.Home
{
    public class IndexModel : PizzeriaPageModel
    {
        public override void OnGet()
        {
            base.OnGet();
            ChildValue = "Home";
        }
    }
}
