using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DonutShop.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DonutShop.Controllers
{
    [Route("api/[controller]/[action]")]
    public class ProductsController : Controller
    {
        private const string ControllerName = "Home";
        private ProductDBContext db;

        public ProductsController(ProductDBContext db)
        {
            this.db = db;
        }

        [HttpGet("{id}", Name = "Get")]
        [ActionName("GetProducts")]
        public void GetProducts()
        {
        }


    }
}
