using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DonutShop.Data;
using DonutShop.Models.Product;
using Microsoft.AspNetCore.Mvc;

namespace DonutShop.Controllers
{
    [Route("api/[controller]/[action]")]
    public class MenuController : Controller
    {

        ApplicationDbContext db;

        public MenuController(ApplicationDbContext db)
        {
            this.db = db;
        }

        [HttpPost]
        [ActionName("Search")]
        public IEnumerable<Product> Search([FromBody] dynamic toSearch)
        {
            string search = toSearch[0]["value"].ToString();
            var products = db.Product.Where(s => s.ProductName.Contains(search)).ToList();
            return products.AsEnumerable();
        }

        [HttpGet]
        [ActionName("AutoComplete")]
        public List<string> AutoComplete()
        {
            var names = db.Product.Select(p => p.ProductName).ToList();
            return names;
        }

    }
}