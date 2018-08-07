using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;

namespace CloudValidator.Models
{
    public class FileHelper
    {

        public async Task<dynamic> GetStreamFromUploadedFile2(HttpRequestMessage Request)
        {

            if (!Request.Content.IsMimeMultipartContent())
            {
                return new
                {
                    error = "Unsupported File",
                    status = false
                };
            }

            var provider = await Request.Content.ReadAsMultipartAsync<InMemoryMultipartFormDataStreamProvider>(new InMemoryMultipartFormDataStreamProvider());

            IList<HttpContent> files = provider.Files;

            HttpContent file1 = files[0];
            var file2 = file1.Headers.ContentDisposition.FileName.Trim('\"').Split('.');
            var thisFileName = file2[0] + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff") + "." + file2[1];

            ////-------------------------------------For testing----------------------------------  
            //to append any text in filename.  
            //var thisFileName = file1.Headers.ContentDisposition.FileName.Trim('\"') + DateTime.Now.ToString("yyyyMMddHHmmssfff"); //ToDo: Uncomment this after UAT as per Jeeevan  

            //List<string> tempFileName = thisFileName.Split('.').ToList();  
            //int counter = 0;  
            //foreach (var f in tempFileName)  
            //{  
            //    if (counter == 0)  
            //        thisFileName = f;  

            //    if (counter > 0)  
            //    {  
            //        thisFileName = thisFileName + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff") + "." + f;  
            //    }  
            //    counter++;  
            //}  

            ////-------------------------------------For testing----------------------------------  

            string filename = String.Empty;
            Stream input = await file1.ReadAsStreamAsync();
            string directoryName = String.Empty;
            string URL = String.Empty;
            //string tempDocUrl = WebConfigurationManager.AppSettings["DocsUrl"];

            var path = AppDomain.CurrentDomain.BaseDirectory;
            //var path = HttpRuntime.AppDomainAppPath;
            directoryName = Path.Combine(path, "App_Data");
            filename = Path.Combine(directoryName, thisFileName);

            //Deletion exists file  
            if (File.Exists(filename))
            {
                File.Delete(filename);
            }

            using (Stream file = File.OpenWrite(filename))
            {
                input.CopyTo(file);
                //close file  
                file.Close();
            }
            var destination = UnzipFile(filename);

            return new
            {
                filename = destination,
                status = true
            };
        }

        private string UnzipFile(string path)
        {
            var pathFormatter = path.Split('\\');
            string destinationPath = "";
            for (int i = 0; i < pathFormatter.Length - 3; i++)
            {
                destinationPath += pathFormatter[i] + "\\";
            }
            destinationPath += "Code\\" + pathFormatter[pathFormatter.Length - 1].Split('.')[0];
            ZipFile.ExtractToDirectory(path, destinationPath);
            return destinationPath;
        }
    }
}