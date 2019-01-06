using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DonutShop.Data;
using Microsoft.AspNetCore.Mvc;

namespace DonutShop.Controllers
{
    public class MenuController : Controller
    {
        ApplicationDbContext db;

        public MenuController(ApplicationDbContext db)
        {
            this.db = db;
        }

        public IActionResult Menu()
        {
            GetProducts();
            return View();
        }


        [HttpGet]
        [ActionName("GetProducts")]
        public void GetProducts()
        {
            var products = db.Product.ToList();

            ViewBag.Products = products;
        }

    }
}