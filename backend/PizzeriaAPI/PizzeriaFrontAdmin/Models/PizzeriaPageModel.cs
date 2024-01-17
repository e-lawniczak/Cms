using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace PizzeriaFrontAdmin.Models
{
    public abstract class PizzeriaPageModel : PageModel
    {
        public new UserModel? User { get; set; }
        public string Title { get; set; } = string.Empty;
        private readonly RequestDelegate _requestDelegate;
        public virtual void OnGet()
        {
            var user = HttpContext.Session.GetString("user");
            var token = HttpContext.Session.GetString("token");
            var id = HttpContext.Session.GetInt32("id");
            if (token != null && user != null && id != null)
            {
                User = new UserModel(user, token, (int)id);
            }
            else
            {
                User = null;
                OnUserNotLogged();
            }
        }
        protected void SaveUser(string email, string token, int id)
        {
            User = new UserModel(email, token, id);
            HttpContext.Session.SetString("user", email);
            HttpContext.Session.SetString("token", token);
            HttpContext.Session.SetInt32("id", id);
        }
        public IActionResult OnUserNotLogged()
        {
            return RedirectToPage("/Privacy");
        }
    }
}
