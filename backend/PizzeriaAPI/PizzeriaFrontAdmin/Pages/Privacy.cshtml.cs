using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using PizzeriaFrontAdmin.Models;

namespace PizzeriaFrontAdmin.Pages
{
    public class PrivacyModel : PizzeriaPageModel
    {
        private readonly ILogger<PrivacyModel> _logger;

        public PrivacyModel(ILogger<PrivacyModel> logger)
        {
            _logger = logger;
        }

        public override void OnGet()
        {
            base.OnGet();
            Title = "Privacy Policy";

        }
    }

}
