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
            //          try
            //          {       
            String newCartName = productToAdd["cartName"].ToString();
            String newProductName = productToAdd["productName"].ToString();
            String newQuantity = "1";
            String newPrice = productToAdd["price"].ToString();

            CartItem check = db.CartItem.Where(product => product.ProductName.Equals(newProductName)).ToList().FirstOrDefault();

            if (check == null)
            {
                CartItem cartItem = new CartItem(newCartName, newProductName, newQuantity, newPrice);
                db.CartItem.Add(cartItem);
                db.SaveChanges();
            }
            else
            {
                check.Quantity = (int.Parse(check.Quantity) + 1).ToString();
                check.ProductPrice = (float.Parse(check.ProductPrice) / (int.Parse(check.Quantity) - 1) * int.Parse(check.Quantity)).ToString();
            }
            db.SaveChanges();
            return "Succes";
            //        }
            //        catch (Exception e)
            //        {
            //            return e.ToString();
            //        }
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
                    foreach (CartItem ci in prod)
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

        [HttpPut]
        [ActionName("UpdateQuantity")]
        public String UpdateQuantity([FromBody] dynamic quantityToUpdate)
        {
            string cartName = quantityToUpdate["cartName"].ToString();
            string productName = quantityToUpdate["productName"].ToString();
            string quantity = quantityToUpdate["currentQuantity"].ToString();

            var prod = db.Product.Where(product => product.ProductName == productName).FirstOrDefault();
            if (prod != null)
            {
                if(int.Parse(quantity) > prod.ProductAmount)
                {
                    quantity = prod.ProductAmount.ToString();
                }

                var cartProd = db.CartItem.Where(product => product.CartName == cartName).ToList()
                    .Where(prods => prods.ProductName == productName).FirstOrDefault();

                cartProd.ProductPrice = (Math.Round(float.Parse(cartProd.ProductPrice), 2) / (int.Parse(cartProd.Quantity)) * int.Parse(quantity)).ToString("0.00");
                cartProd.Quantity = quantity;
                db.SaveChanges();
                return "Succes";
            }
            return "Product not found";
        }
    }
}