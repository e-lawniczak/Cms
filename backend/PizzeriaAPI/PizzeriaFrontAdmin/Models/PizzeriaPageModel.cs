using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Http;

namespace PizzeriaFrontAdmin.Models
{
    public abstract class PizzeriaPageModel : PageModel
    {
		public IOptions<HashSettings> hashSettings { get; set; }
		public UserModel? User { get; set; }
        public string Title { get; set; } = string.Empty;

        public virtual void OnGet()
        {
            var user = HttpContext.Session.GetString("user");
            var token = HttpContext.Session.GetString("token");
            var id = HttpContext.Session.GetInt32("id");
            //var user = Request.Cookie["user"];
            //var token = Request.Cookie["token"];
            //var id = Request.Cookies["id"];
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
        protected void LogOut()
        {
            User = null;
            HttpContext.Session.Clear();
        }
        public void OnUserNotLogged()
        {
           
            var url = HttpContext.Request.Path.Value;
            var query = HttpContext.Request.Query;
            if (User == null && url != "/Login" && url != "/Register" && url != "/ResetPassword")
                Response.Redirect("/Login");
        }
    }
}
