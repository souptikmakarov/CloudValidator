using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CloudValidator.Models
{
    public class RuleDocument
    {
        public string Application { get; set; }
        public string FactorType { get; set; }
        public List<Rule> Include { get; set; }
        public List<Rule> Exclude { get; set; }
    }

    public class Rule
    {
        public string RuleName { get; set; }
        public List<dynamic> RuleConditions { get; set; }
    }
}