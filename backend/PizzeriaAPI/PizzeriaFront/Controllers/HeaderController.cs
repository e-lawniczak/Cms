using Microsoft.AspNetCore.Mvc;

namespace PizzeriaFrontKlient.Controllers
{
    public class HeaderController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
