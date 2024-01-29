using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting.Server;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Swashbuckle.Swagger;

namespace PizzeriaFrontAdmin.Models
{
    public abstract class PizzeriaPageModel : PageModel
    {
        public IOptions<HashSettings> hashSettings { get; set; }
        public UserModel? User { get; set; }
        public string Title { get; set; } = string.Empty;

        public virtual void OnGet()
        {
            var user = Request.Cookies["user"];
            var token = Request.Cookies["token"];
            var id = Request.Cookies["id"];
            if (token != null && user != null && id != null)
            {
                User = new UserModel(user, token, Int32.Parse(id));
                OnUserLogged();
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

            Response.Cookies.Append("user", email);
            Response.Cookies.Append("token", token);
            Response.Cookies.Append("id", id.ToString());
        }
        protected void LogOut()
        {
            User = null;
            HttpContext.Session.Clear();
            Response.Cookies.Delete("user");
            Response.Cookies.Delete("token");
            Response.Cookies.Delete("id");
        }
        public void OnUserNotLogged()
        {

            var url = HttpContext.Request.Path.Value;
            var query = HttpContext.Request.Query;
            if (User == null && url != "/Login" && url != "/Top/Secret/Register" && url != "/ResetPassword")
                Response.Redirect("/Login");



        }
        public void OnUserLogged()
        {
            var url = HttpContext.Request.Path.Value;

            if (User != null && (url == "/Login" || url == "/Top/Secret/Register" || url == "/ResetPassword"))
                Response.Redirect("/");
        }
    }
}
