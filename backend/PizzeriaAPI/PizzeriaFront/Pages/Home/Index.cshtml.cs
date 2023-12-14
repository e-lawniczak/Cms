using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using PizzeriaFrontKlient.Models;

namespace PizzeriaFrontKlient.Pages.Home
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
