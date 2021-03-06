﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CloudValidator.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult New_Index()
        {
            return View("Index2.cshtml");
        }

        public ActionResult Admin()
        {
            return View();
        }

        public ActionResult Test()
        {
            return View();
        }

        public ActionResult FileReportTemplate()
        {
            return File(Server.MapPath("/Views/Home/") + "FileReportTemplate.html", "text/html");
        }
    }
}