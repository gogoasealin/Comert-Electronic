using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using DonutShop.Models.Product;

namespace DonutShop.Models
{
    public class CartItem
    {
        [Key]
        public int ID { get; set; }
        public string CartName { get; set; }
        public string ProductName { get; set; }
        public string Quantity { get; set; }
        public string ProductPrice { get; set; }

        private CartItem() {; }

        public CartItem(string CartName, string ProductName, string Quantity, string ProductPrice)
        {
            this.CartName = CartName;
            this.ProductName = ProductName;
            this.Quantity = Quantity;
            this.ProductPrice = ProductPrice;
        }

    }
}
