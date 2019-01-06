﻿using System;
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
            //ViewData["Message"] = "Your application description page.";
            //return View("Index"); sau daca e gol numele functiei
            GetProducts();
            return View();
        }

        public IActionResult ShoppingCart()
        {
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

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
