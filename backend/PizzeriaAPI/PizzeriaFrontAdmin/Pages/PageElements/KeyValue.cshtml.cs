using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json.Linq;
using PizzeriaAPI.Dto;
using PizzeriaFrontAdmin.Models;

namespace PizzeriaFrontAdmin.Pages
{
    public class KeyValueModel : PizzeriaPageModel
    {
        public  override void OnGet()
        {
            base.OnGet();
            Title = "Key-Value";

        }

    }
}
