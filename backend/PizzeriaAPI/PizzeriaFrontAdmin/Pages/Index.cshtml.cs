using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using PizzeriaFrontAdmin.Models;

namespace PizzeriaFrontAdmin.Pages
{
    public class IndexModel : PizzeriaPageModel
    {
        private readonly ILogger<IndexModel> _logger;

        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public override void OnGet()
        {
            base.OnGet();
            Title = "Home page";
        }
       

    }
}
