using Microsoft.AspNetCore.Mvc;

namespace PizzeriaFrontKlient.Controllers
{
    public class FooterController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
