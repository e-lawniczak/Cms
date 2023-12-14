using Microsoft.AspNetCore.Mvc.RazorPages;

namespace PizzeriaFrontKlient.Models
{
    public abstract class PizzeriaPageModel : PageModel
    {
        public string ParentValue { get; set; } = String.Empty;
        public string ChildValue {  get; set; } = String.Empty;
        public virtual void  OnGet()
        {
            ParentValue = "Pizzeria model";
        }
    }
}
