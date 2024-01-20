using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace PizzeriaFrontAdmin.Pages.PageElements
{
    public class ContactInfoModel : Models.PizzeriaPageModel
    {
        public override void OnGet()
        {
            base.OnGet();
            Title = "ContactInfo";
        }
    }
}
