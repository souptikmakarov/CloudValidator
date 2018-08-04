using System.Web;
using System.Web.Optimization;

namespace CloudValidator
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/knockout").Include(
                        "~/Scripts/knockout-{version}.js",
                        "~/Scripts/knockout.validation.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/index").Include("~/Scripts/index.js"));

            bundles.Add(new ScriptBundle("~/bundles/admin").Include("~/Scripts/admin.js"));
            bundles.Add(new ScriptBundle("~/bundles/test").Include("~/Scripts/test.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/datatablejs").Include(
                "~/Scripts/dataTables.js", "~/Scripts/jquery.dataTables.min.js"));

            bundles.Add(new StyleBundle("~/Content/datatablecss").Include(
                "~/Content/dataTables.css"));


            bundles.Add(new ScriptBundle("~/bundles/acejs").Include(
                "~/Scripts/ace.js", "~/Scripts/mode-csharp.js", "~/Scripts/mode-javascript.js", "~/Scripts/theme-monokai.js"));

            bundles.Add(new StyleBundle("~/Content/acecss").Include(
                "~/Content/ace_api.css.css"));


        }
    }
}
