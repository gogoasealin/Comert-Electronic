using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DonutShop;
using DonutShop.Data;
using DonutShop.Models.Product;

namespace DonutShop.Controllers
{
    [Route("api/[controller]/[action]")]
    public class ProductsController : Controller
    {

        ApplicationDbContext db;

        public ProductsController(ApplicationDbContext db)
        {
            this.db = db;
        }

        [HttpPost]
        [ActionName("AddProduct")]
        public String AddProduct([FromBody] dynamic productToAdd)
        {
            try
            {
                String name = productToAdd[0]["value"].ToString();
                String description = productToAdd[1]["value"].ToString();
                String price = productToAdd[2]["value"].ToString();
                int quantity = Int32.Parse(productToAdd[3]["value"].ToString());
                String image = "/images/" + productToAdd[4]["value"].ToString() + ".jpg";


                Product product = new Product(name, description, price, quantity, image);
                db.Product.Add(product);
                db.SaveChanges();

                return "Succes";
            }
            catch(Exception e)
            {
                return e.ToString();
            }
        }


        [HttpDelete]
        [ActionName("RemoveProduct")]
        public String RemoveProduct([FromBody] dynamic productToRemove)
        {
            try
            {
                String name = productToRemove[0]["value"].ToString();
                    
                var prod = db.Product.Where(product => product.ProductName == name).ToList().FirstOrDefault();
                if (prod != null)
                {
                    db.Product.Remove(prod);
                    db.SaveChanges();
                    return "Succes";
                }
                return "Product not found";
            }
            catch (Exception e)
            {
              return e.ToString();
            }
        }

        [HttpPut]
        [ActionName("UpdateProduct")]
        public String UpdateProduct([FromBody] dynamic productToUpdate)
        {
            try
            { 
                String currentName = productToUpdate[0]["value"].ToString();
                String name = productToUpdate[1]["value"].ToString();
                String description = productToUpdate[2]["value"].ToString();
                String price = productToUpdate[3]["value"].ToString();
                int quantity = Int32.Parse(productToUpdate[4]["value"].ToString());
                String image = "~/images/" + productToUpdate[5]["value"].ToString();

                var prod = db.Product.Where(product => product.ProductName == currentName).ToList().FirstOrDefault();
                if (prod != null)
                {
                    prod.ProductName = name;
                    prod.ProductDescription = description;
                    prod.ProductPrice = price;
                    prod.ProductAmount = quantity;
                    prod.ProductImage = image;

                    db.Product.Update(prod);
                    db.SaveChanges();
                    return "Succes";
                }
                return "Product not found";
            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }


    }
}