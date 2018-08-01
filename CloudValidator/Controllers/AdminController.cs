using CloudValidator.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace CloudValidator.Controllers
{
    public class AdminController : ApiController
    {
        private ElasticDataProvider dataProvider;
        public AdminController()
        {
            dataProvider = new ElasticDataProvider();
        }
        [HttpGet]
        public async Task<IHttpActionResult> GetRules(string apptype, string factor)
        {
            var resp = dataProvider.GetRules(apptype, factor);
            return Json(resp);
        }
    }
}
