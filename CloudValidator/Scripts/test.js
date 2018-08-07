$(function () {
    var myController = function () {
        var self = this;
        self.photoUrl = ko.observable();
        self.fileUpload = function (data, e) {
            var file = e.target.files[0];
            var reader = new FileReader();

            reader.onloadend = function (onloadend_e) {
                var result = reader.result; // Here is your base 64 encoded file. Do with it what you want.
                self.photoUrl(result);
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        };
    };
    ko.applyBindings(new myController());


    var editor = ace.edit("codeeditor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/csharp");

    //$('#codeeditor').html(
    //    'using System;' + '<br/>' +
    //    'using System.Collections.Generic;' + '<br/>' +
    //    'using System.Linq;' + '<br/>' +
    //    'using System.Net;' + '<br/>' +
    //    'using System.Net.Http;' + '<br/>' +
    //    'using System.Threading.Tasks;' + '<br/>' +
    //    'using System.Web.Http;' + '<br/>' +

    //    'namespace CloudValidator.Controllers {' + '<br/>' +
    //    'public class ValidateController : ApiController' + '<br/>' +
    //    '{' + '<br/>' +
    //    'public async Task < IHttpActionResult > UploadProject() {' + '<br/>' +
    //    '   return Json(new { hello = "world" });' + '<br/>' +
    //    '}' + '<br/>' +
    //    '}' + '<br/>' +
    //    '}'
    //);
    $('#codeeditor').load("http://localhost:6699/api/Validate/GetFile", { path: "C:\My_Files\Projects\CloudValidator\Code\source_20180806230735111\source\HomeController.cs" });
});