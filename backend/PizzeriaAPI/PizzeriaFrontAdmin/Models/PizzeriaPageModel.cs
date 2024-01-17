using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.DataProtection.XmlEncryption;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace PizzeriaFrontAdmin.Models
{
    public abstract class PizzeriaPageModel : PageModel
    {
        public new UserModel? User { get; set; }
        public string Title { get; set; } = string.Empty;
        [Inject]
        public NavigationManager NavigationManager { get; set; }
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
        public void OnUserNotLogged()
        {
            //NavigationManager.NavigateTo("/Login");
            //return RedirectToPage("/Privacy");
            //await Task.Run(() => { NavigationManager.NavigateTo("/Login"); });
            var url = HttpContext.Request.Path.Value;
            var query = HttpContext.Request.Query;
            //if (User == null && url != "/Login" && url != "/Register" && url != "/ResetPassword")
            //    Response.Redirect("/Login");
        }
    }
}
