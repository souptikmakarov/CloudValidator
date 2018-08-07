using CloudValidator.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace CloudValidator.Controllers
{

    public class ValidateController : ApiController
    {
        FileHelper fh;
        public ValidateController()
        {
            fh = new FileHelper();
        }
        string bookPath_Pdf = @"C:\My_Files\Projects\CloudValidator\Code\source_20180807121355475\source\HomeController.cs";
        
        public async Task<IHttpActionResult> UploadProject(HttpRequestMessage request) {
            var stream = await fh.GetStreamFromUploadedFile2(request);
            return Json(stream);
        }


        [HttpGet]
        public IHttpActionResult ReadFile(string path)
        {
            //string bookName = "HomeController.cs";
            ////converting Pdf file into bytes array  
            //var dataBytes = File.ReadAllBytes(bookPath_Pdf);
            ////adding bytes to memory stream   
            //var dataStream = new MemoryStream(dataBytes);
            //return new eBookResult(dataStream, Request, bookName);

            string text = File.ReadAllText(path);
            text = HttpUtility.HtmlEncode(text);
            text = text.Replace("\r\n", "\r");
            text = text.Replace("\n", "\r");
            text = text.Replace("\r", "</br>");
            text = text.Replace("  ", " &nbsp;");
            return Ok(text);
        }


        [HttpPost]
        public IHttpActionResult DownloadGitCode([FromBody]ApplicationUrl applicationUrl)
        {
            //string firsturl = "https://github.com/souptikmakarov/CloudValidator.git";
            string projectName = applicationUrl.Url.Substring(0, applicationUrl.Url.IndexOf(".git"));
            projectName = projectName.Substring(projectName.LastIndexOf("/") + 1);


            // "http://git.dell.com/morty-nivers/FeatureToggleClient/archive/master.zip"
            string path = string.Concat(applicationUrl.Url.Substring(0, applicationUrl.Url.IndexOf(".git")), "/archive/master.zip");

            string destination = ApplicationConstants.BaseFolderLocation + projectName + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff") + ".zip";
            using (var client = new WebClient())
            {
                client.DownloadFile(path, destination);
            }
            string folderLocation = fh.UnzipFile(destination, projectName);
            return Json(folderLocation + "-master");
        }
    }
}
