using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace PizzeriaFrontAdmin.Pages.PageElements
{
    public class TeamMemberModel : Models.PizzeriaPageModel
    {
        public override void OnGet()
        {
            base.OnGet();
            Title = "TeamMember";
        }
    }
}
