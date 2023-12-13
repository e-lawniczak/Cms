using Microsoft.AspNetCore.Mvc;

namespace PizzeriaFrontKlient.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            var x = 1;
            Console.WriteLine(x);
            return View();
        }
    }
}
