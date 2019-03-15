using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DonutShop.Models;
using DonutShop.Data;


namespace DonutShop.Controllers
{
    public class HomeController : Controller
    {
        ApplicationDbContext db;

        public HomeController(ApplicationDbContext db)
        {
            this.db = db;
        }


        public IActionResult Index()
        {
            GetProducts();
            return View();
        }

        public IActionResult Menu()
        {
            GetProducts();
            return View();
        }

        public IActionResult ShoppingCart()
        {
            GetCartProducts();
            GetTotal();
            return View();
        }

        public IActionResult Login()
        {
            return View();
        }

        public IActionResult AdminPanel()
        {
            return View();
        }

        public IActionResult Contact()
        {
            return View();
        }

        [HttpGet]
        [ActionName("GetProducts")]
        public void GetProducts()
        {
            var products = db.Product.ToList();

            ViewBag.Products = products;
        }

        [HttpGet]
        [ActionName("GetCartProducts")]
        public void GetCartProducts()
        {
            var products = db.CartItem.ToList();

            ViewBag.CartProducts = products;
        }


        [HttpGet]
        [ActionName("GetTotal")]
        public void GetTotal()
        {
            var products = db.CartItem.ToList();
            float total = 0;
            var user = HttpContext.User.Identity.Name;
            foreach ( CartItem prods in products)
            {
                if (prods.CartName == user)
                {
                    total += float.Parse(prods.ProductPrice);
                }
            }

            ViewBag.Total = total;
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
