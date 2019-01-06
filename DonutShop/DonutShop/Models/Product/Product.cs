using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DonutShop.Models.Product
{
    public class Product
    {
        [Key]
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public string ProductPrice { get; set; }
        public int ProductAmount { get; set; }
        public string ProductImage { get; set; }

        private Product() {;}

        public Product(string ProductName, string ProductDescription, string ProductPrice, int ProductAmount, string ProductImage)
        {
           
            this.ProductName = ProductName;
            this.ProductDescription = ProductDescription;
            this.ProductPrice = ProductPrice;
            this.ProductAmount = ProductAmount;
            this.ProductImage = ProductImage;
        }
    }
}
