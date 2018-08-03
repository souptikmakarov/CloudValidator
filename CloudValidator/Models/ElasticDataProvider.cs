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
        public async Task<string> GetRules(string apptype, string factor)
        {
            var elasticQuery = string.Format(RuleQuery, apptype, factor);
            var elasticResponse = await WebApiRequest("/_search", elasticQuery, HttpMethod.Post);
            return elasticResponse;
        }

        public async Task<string> WebApiRequest<T>(string requestUri, T content, HttpMethod httpMethod)
        {
            var client = new HttpClient();
            var uri = ConfigurationManager.AppSettings["elasticUrl"] + ApplicationConstants.IndexName + "/" + ApplicationConstants.RuleType + requestUri;
            client.BaseAddress = new Uri(uri);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));//ACCEPT header
            client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue(
                "Basic",
                Convert.ToBase64String(
                    System.Text.ASCIIEncoding.ASCII.GetBytes(
                        string.Format("{0}:{1}", ApplicationConstants.ElasticUserName, ApplicationConstants.ElasticPassword))));
            var convertedContent = content as string;
            var data = new StringContent(convertedContent, Encoding.UTF8, "application/json");
            var response = await client.PostAsync(uri, data);
            var data1 = await response.Content.ReadAsStringAsync();
            return data1;
        }

        public async Task<string> SetRules(string rule, string id)
        {
            var elasticResponse = await WebApiRequest("/" + id, rule, HttpMethod.Post);
            return elasticResponse;
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