using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DonutShop.Context;
using DonutShop.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DonutShop.Controllers
{
    [Route("api/[controller]/[action]")]
    public class UsersController : Controller
    {
        DonutShopDBContext db;


        public UsersController(DonutShopDBContext db)
        {
            this.db = db;
        }

        [HttpPost]
        [ActionName("Login")]
        public IActionResult Login([FromBody]dynamic userLogin)
        {
            string ID = userLogin["userLogin"][0]["value"].ToString(); 
            string Password = userLogin["userLogin"][1]["value"].ToString();
            User _user = new User(ID, Password);

            var users = db.Users; 
             foreach (var user in users)
            {
                if(ID == user.ID)
                {
                    //logged   
                    return RedirectToAction("Index", "Home");
                }
            }

            //TempData["msg"] = "<script>alert('Incorrect username and password');</script>";
            //ViewBag.HtmlStr = "<script>alert('Incorrect username and password');</script>";
            //return Json(new
            //{
            //    redirectUrl = RedirectToAction("Login")
            //});

           return RedirectToAction("Contact", "Home"); /// ce ar trebui sa returnez?
                                                        /// 
        }


        [HttpPost]
        [ActionName("Register")]
        public IActionResult Register([FromBody]dynamic userLogin)
        {
            Console.WriteLine(userLogin);
            string ID = userLogin["userLogin"][0]["value"].ToString();
            string Password = userLogin["userLogin"][1]["value"].ToString();
            User _user = new User(ID, Password);

            db.Users.Add(_user);
            db.SaveChanges();

            return RedirectToAction("Index", "Home");

        }
    }
}