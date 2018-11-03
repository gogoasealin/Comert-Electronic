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
        protected string AccesLevel { get { return AccesLevel; } set {} }

        public UsersController(DonutShopDBContext db)
        {
            this.db = db;
        }

        [HttpPost]
        [ActionName("Login")]
        public string Login([FromBody]dynamic userLogin)
        {
            string ID = userLogin[0]["value"].ToString(); 
            string Password = userLogin[1]["value"].ToString();
            User _user = new User(ID, Password, "0");

            var users = db.Users; 
             foreach (var user in users)
            {
                if(ID == user.ID)
                {
                    HttpContext.Session.SetString("loggedInUser", ID);
                    return "Succes";
                    //logged   
                    //return RedirectToAction("Index", "Home");
                }
            }
            return "Fail";
            //TempData["msg"] = "<script>alert('Incorrect username and password');</script>";
            //ViewBag.HtmlStr = "<script>alert('Incorrect username and password');</script>";
            //return Json(new
            //{
            //    redirectUrl = RedirectToAction("Login")
            //});

           //return RedirectToAction("Contact", "Home"); /// ce ar trebui sa returnez?
                                                        /// 
        }


        [HttpPost]
        [ActionName("Register")]
        public IActionResult Register([FromBody]dynamic userLogin)
        {
            string ID = userLogin[0]["value"].ToString();
            string Password = userLogin[1]["value"].ToString();
            User _user = new User(ID, Password);

            db.Users.Add(_user);
            db.SaveChanges();

            return RedirectToAction("Index", "Home");

        }

        [HttpPost]
        [ActionName("GetAccesLevel")]
        public string GetAccesLevel([FromBody]dynamic userEmail)
        {
            if(userEmail != null)
            {
                string userMail = userEmail.ToString();
                var AccesLevel = db.Users
                    .Where(user => user.ID.Equals(userMail))
                    .FirstOrDefault().Administrator;
                return AccesLevel;
            }
            var name = HttpContext.Session.GetString("loggedInUser");
            if (name != null)
            {
                string userMail = name;
                var AccesLevel = db.Users
                    .Where(user => user.ID.Equals(userMail))
                    .FirstOrDefault().Administrator;
                return AccesLevel;
            }
            return "0";

        }

        [HttpPost]
        [ActionName("GetLoggedInUser")]
        public string GetLoggedInUser()
        {
            string name = HttpContext.Session.GetString("loggedInUser");
            if(name != null)
            {
                return HttpContext.Session.GetString("loggedInUser");
            }
            return null;
        }

        [HttpGet]
        [ActionName("LogOut")]
        public IActionResult LogOut()
        {
            HttpContext.Session.Remove("loggedInUser");
            return RedirectToAction("Index", "Home");
        }
    }


}