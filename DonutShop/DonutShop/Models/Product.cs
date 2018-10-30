using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DonutShop.Models
{
    public class Product
    {
        [Key]
        public string _Name { get; set; }
        public string _Image { get; set; }
        public string _Price { get; set; }
        public string _Ingredients { get; set; }


        // GET: /<controller>/
        public Product() { }

        public Product(string name, string image, string price, string ingredients)
        {
            _Name = name;
            _Image = image;
            _Price = price;
            _Ingredients = ingredients;
        }

    }


}
