using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;
using PizzeriaFrontAdmin.Models;

namespace PizzeriaFrontAdmin.Pages.Account
{
    public class LoginModel : PizzeriaPageModel
    {
        public string Password { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

        public bool IsError { get; set; }

        private string _baseUrl = "https://localhost:7156/api/Account";
        public override void OnGet()
        {
            base.OnGet();
            this.Title = "Login";

        }

        public async void OnPost()
        {
            var email = Request.Form["Email"];
            var password = Request.Form["Password"];
            await SendLoginRequest(email, password);
        }
        public async Task<IActionResult> SendLoginRequest(string email, string password)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    HttpRequestMessage request = new HttpRequestMessage();
                    request.RequestUri = new Uri(_baseUrl + "/login");
                    request.Method = HttpMethod.Post;
                    request.Content = JsonContent.Create(new { email = email, password = password });
                    HttpResponseMessage response = await client.SendAsync(request);
                    var responseString = await response.Content.ReadAsStringAsync();
                    var statusCode = response.StatusCode;
                    if (response.IsSuccessStatusCode && responseString != "")
                    {
                        UserModel user = (UserModel)JsonConvert.DeserializeObject(responseString);
                        base.SaveUser(user.email, user.token, user.id);
                        return RedirectToPage("/");
                    }
                    else
                    {
                        IsError = true;
                        return Page();
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
