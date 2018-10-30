using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DonutShop.Context;
using DonutShop.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DonutShop.Controllers
{
    [Route("api/[controller]/[action]")]
    public class ProductsController : Controller
    {
        private const string ControllerName = "Products";

        [HttpGet]
        [ActionName("GetProducts")]
        public void GetProducts()
        {
        }

        // product service si mut toata logica acolo 
        // apelze din controlul de products
        // in service tin contextul
        // dependency injection

        public IActionResult Check()
        {
            return RedirectToAction("Index", "Home");
        }


    }
}
