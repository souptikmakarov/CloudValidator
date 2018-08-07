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
        string bookPath_Pdf = @"C:\My_Files\Projects\CloudValidator\Code\source_20180806230735111\source\HomeController.cs";
        
        public async Task<IHttpActionResult> UploadProject(HttpRequestMessage request) {
            var stream = await fh.GetStreamFromUploadedFile2(request);
            return Json(stream);
        }


        [HttpGet]
        [Route("GetFile/{path}")]
        public IHttpActionResult GetFile(string path)
        {
            //string bookName = "HomeController.cs";
            ////converting Pdf file into bytes array  
            //var dataBytes = File.ReadAllBytes(bookPath_Pdf);
            ////adding bytes to memory stream   
            //var dataStream = new MemoryStream(dataBytes);
            //return new eBookResult(dataStream, Request, bookName);

            string text = File.ReadAllText(bookPath_Pdf);
            text = HttpUtility.HtmlEncode(text);
            text = text.Replace("\r\n", "\r");
            text = text.Replace("\n", "\r");
            text = text.Replace("\r", "</br>\r\n");
            text = text.Replace("  ", " &nbsp;");
            return Ok(text);
        }
    }

    public class eBookResult : IHttpActionResult
    {
        MemoryStream bookStuff;
        string PdfFileName;
        HttpRequestMessage httpRequestMessage;
        HttpResponseMessage httpResponseMessage;
        public eBookResult(MemoryStream data, HttpRequestMessage request, string filename)
        {
            bookStuff = data;
            httpRequestMessage = request;
            PdfFileName = filename;
        }
        public System.Threading.Tasks.Task<HttpResponseMessage> ExecuteAsync(System.Threading.CancellationToken cancellationToken)
        {
            httpResponseMessage = httpRequestMessage.CreateResponse(HttpStatusCode.OK);
            httpResponseMessage.Content = new StreamContent(bookStuff);
            //httpResponseMessage.Content = new ByteArrayContent(bookStuff.ToArray());  
            httpResponseMessage.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
            httpResponseMessage.Content.Headers.ContentDisposition.FileName = PdfFileName;
            httpResponseMessage.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/octet-stream");

            return System.Threading.Tasks.Task.FromResult(httpResponseMessage);
        }
    }
}
