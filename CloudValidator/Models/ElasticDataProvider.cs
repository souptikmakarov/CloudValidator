using Nest;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace CloudValidator.Models
{
    public class ElasticDataProvider
    {
        //private HttpElasticClient elasticClient;
        public ElasticDataProvider()
        {
            //elasticClient = new HttpElasticClient(new HttpElasticClientConfiguration(ConfigurationManager.AppSettings["elasticUrl"]));
        }
        //internal string GetByAuthenticatedSearch(string index, string type, string query)
        //{
            //return elasticClient.Search(index, type, query);
        //}
        public dynamic GetRules(string apptype, string factor)
        {
            var elasticQuery = string.Format(RuleQuery, apptype, factor);
            var elasticResponse = WebApiRequest(elasticQuery, elasticQuery, HttpMethod.Post);
            //var elasticResponse = GetByAuthenticatedSearch(ApplicationConstants.IndexName, ApplicationConstants.RuleType, elasticQuery);
            return elasticResponse;
        }

        public dynamic WebApiRequest<T>(string requestUri, T content, HttpMethod httpMethod)
        {
            var client = new HttpClient();
            var uri = ConfigurationManager.AppSettings["elasticUrl"] + ApplicationConstants.IndexName + "/" + ApplicationConstants.RuleType + "/_search";
            client.BaseAddress = new Uri(uri);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));//ACCEPT header
            client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue(
                "Basic",
                Convert.ToBase64String(
                    System.Text.ASCIIEncoding.ASCII.GetBytes(
                        string.Format("{0}:{1}", "yyha2fhyz2", "n0v42zjtvl"))));
            var convertedContent = content as string;
            //var request = new HttpRequestMessage(httpMethod, requestUri);
            //request.Content = new StringContent(convertedContent, Encoding.UTF8, "application/json");//CONTENT-TYPE header
            var data = new StringContent(convertedContent, Encoding.UTF8, "application/json");//CONTENT-TYPE header
            //var response = await client.SendAsync(request);
            var response = client.PostAsync(uri,data).Result.Content;
            return response;
        }

        private readonly string RuleQuery = @"{{
	        ""query"":{{
		        ""bool"" : {{
			        ""filter"" : [
				        {{
					        ""match"" : {{
						        ""Application"" : ""{0}""
					        }}
				        }},
				        {{
					        ""match"" : {{
						        ""FactorType"" : ""{1}""
					        }}
				        }}
			        ]
		        }}
	        }}
        }}";
    }
}