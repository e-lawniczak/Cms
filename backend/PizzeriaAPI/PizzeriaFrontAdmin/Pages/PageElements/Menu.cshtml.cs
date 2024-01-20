using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace PizzeriaFrontAdmin.Pages.PageElements
{
    public class MenuModel : Models.PizzeriaPageModel
    {
        public override void OnGet()
        {
            base.OnGet();
            Title = "Menu";
        }
    }
}
