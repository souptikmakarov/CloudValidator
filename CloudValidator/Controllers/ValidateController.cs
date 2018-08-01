using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace CloudValidator.Controllers
{
    public class ValidateController : ApiController
    {
        public async Task<IHttpActionResult> UploadProject() {
            return Json(new { hello = "world"});
        }
    }
}
