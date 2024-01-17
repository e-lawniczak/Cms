using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using PizzeriaFrontAdmin.Models;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Options;

namespace PizzeriaFrontAdmin.Pages.Account
{
    public class RegisterModel : PizzeriaPageModel
	{
		public RegisterModel(IOptions<HashSettings> hashSettings)
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
            this.Title = "Register";
        }

        public async Task OnPost()
        {
            var email = Request.Form["Email"];
            var password = Request.Form["Password"];
            await SendReqisterRequest(email, password);
        }

        public async Task SendReqisterRequest(string email, string password)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    HttpRequestMessage request = new HttpRequestMessage();
                    request.RequestUri = new Uri(_baseUrl + "/register");
                    request.Method = HttpMethod.Post;
                    var hashedPass = BCrypt.Net.BCrypt.HashPassword(password, hashSettings.Value.Salt);
                    request.Content = JsonContent.Create( new { email = email, password = hashedPass });
                    HttpResponseMessage response = await client.SendAsync(request);
                    var responseString = await response.Content.ReadAsStringAsync();
                    var statusCode = response.StatusCode;
                    if (response.IsSuccessStatusCode)
                    {
                        Response.Redirect("/Login");
                    }
                    else
                    {
                        IsError = true;
                        Response.Redirect("/Register");
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
