using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DonutShop.Models
{
    public class User
    {
        [Key]
        public string ID { get; set; }
        public string Password { get; set; }
        public string Administrator { get; set; }

        public User(string ID, string Password, string Administrator = "0")
        {
            this.ID = ID;
            this.Password = Password;
            this.Administrator = Administrator;
        }
    }
}
