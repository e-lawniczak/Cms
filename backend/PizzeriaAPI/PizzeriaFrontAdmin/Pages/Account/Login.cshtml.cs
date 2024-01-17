using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PizzeriaFrontAdmin.Models;

namespace PizzeriaFrontAdmin.Pages.Account
{
    public class LoginModel : PizzeriaPageModel
    {
		public LoginModel(IOptions<HashSettings> hashSettings)
		{
			this.hashSettings = hashSettings;
		}
		public string Password { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

        public bool IsError { get; set; }

        private string _baseUrl = "https://localhost:7156/api/Account";
        public override void OnGet()
        {
            base.OnGet();
            this.Title = "Login";

        }

        public async Task OnPost()
        {
            var email = Request.Form["Email"];
            var password = Request.Form["Password"];
            await SendLoginRequest(email, password);
        }
        public async Task SendLoginRequest(string email, string password)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    HttpRequestMessage request = new HttpRequestMessage();
                    request.RequestUri = new Uri(_baseUrl + "/login");
                    request.Method = HttpMethod.Post;
                    var hashedPass = BCrypt.Net.BCrypt.HashPassword(password, hashSettings.Value.Salt);

                    request.Content = JsonContent.Create(new { email = email, password = hashedPass });
                    HttpResponseMessage response = await client.SendAsync(request);
                    var responseString = await response.Content.ReadAsStringAsync();
                    var statusCode = response.StatusCode;
                    if (response.IsSuccessStatusCode && responseString != "")
                    {
                        JObject user = (JObject)JsonConvert.DeserializeObject(responseString);
                        base.SaveUser(user["email"].ToString(), user["token"].ToString(), Int32.Parse(user["id"].ToString()));
                        Response.Redirect("/");
                    }
                    else
                    {
                        IsError = true;
                        Response.Redirect("/Login");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex);
                throw;
            }
        }
    }
}
