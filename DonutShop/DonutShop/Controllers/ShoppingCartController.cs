using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DonutShop.Data;
using DonutShop.Models;
using Microsoft.AspNetCore.Mvc;

namespace DonutShop.Controllers
{
    [Route("api/[controller]/[action]")]
    public class ShoppingCartController : Controller
    {

        ApplicationDbContext db;

        public ShoppingCartController(ApplicationDbContext db)
        {
            this.db = db;

        }

        [HttpPost]
        [ActionName("AddProduct")]
        public String AddProduct([FromBody] dynamic productToAdd)
        {
            try
            {
                String newCartName = productToAdd["cartName"].ToString();
                String newProductName = productToAdd["productName"].ToString();
                String newQuantity = "1";
                String newPrice = productToAdd["price"].ToString();

                CartItem cartItem = new CartItem(newCartName, newProductName, newQuantity, newPrice);
                db.CartItem.Add(cartItem);
                db.SaveChanges();

                return "Succes";
            }
            catch (Exception e)
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
                string cartName = productToRemove["cartName"].ToString();
                String productName = productToRemove["productName"].ToString();

                var prod = db.CartItem.Where(product => product.CartName == cartName).Where(product => product.ProductName == productName).ToList().FirstOrDefault();
                if (prod != null)
                {
                    db.CartItem.Remove(prod);
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

        [HttpDelete]
        [ActionName("Checkout")]
        public String Checkout([FromBody] dynamic productToRemove)
        {
            try
            {
                string cartName = productToRemove["cartName"].ToString();

                var prod = db.CartItem.Where(product => product.CartName == cartName).ToList();
                if (prod != null)
                {
                    foreach(CartItem ci in prod)
                    {
                        db.CartItem.Remove(ci);
                    }
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