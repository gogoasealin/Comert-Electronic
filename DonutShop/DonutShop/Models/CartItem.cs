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

        public string CartId { get; set; }
        public string ProductName { get; set; }
        public string Quantity { get; set; }
        public string ProductPrice { get; set; }

        private CartItem() {; }

        public CartItem(string CartId, string ProductName, string Quantity, string ProductPrice)
        {
            this.CartId = CartId;
            this.ProductName = ProductName;
            this.Quantity = Quantity;
            this.ProductPrice = ProductPrice;
        }

    }
}
