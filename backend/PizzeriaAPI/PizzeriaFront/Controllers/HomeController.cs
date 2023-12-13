using Microsoft.AspNetCore.Mvc;

namespace PizzeriaFrontKlient.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
