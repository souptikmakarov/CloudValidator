var dtSystemCustomerSet;
$(function () {
    function GetBaseUrl() {
        return window.location.origin;
    }

    function FactorReport() {
        var self = this;

    }

    function ValidatorViewModel() {
        var self = this;
        self.codeSourceType = ko.observable("folder");
        self.codeSourceLink = ko.observable();
        self.factorWiseReport = ko.observableArray([]);
        self.isValidationComplete = ko.observable(false);
        self.isInputPanelCollapsed = ko.observable(false);
        var FileObject;

        function toggleIcon(e) {
            $(e.target)
                .prev('.panel-heading')
                .find(".more-less")
                .toggleClass('glyphicon-plus glyphicon-minus');
        }
        $('.panel-group').on('hidden.bs.collapse', toggleIcon);
        $('.panel-group').on('shown.bs.collapse', toggleIcon);

        self.fileUpload = function (data, e) {
            FileObject = e.target.files[0];
        };


        self.Validate = function (data, e) {
            if (FileObject == undefined) {
                alert("Please upload the folder");
                return false;
            }
            var fd = new FormData();
            fd.append('file', FileObject);
            //fd.append("CustomField", "This is some extra data");
            $.ajax({
                url: '/api/Validate/UploadProject',
                type: 'POST',
                data: fd,
                success: function (data) {
                    data = data.filename.split('\\');
                    self.getValidationResponse(data[data.length - 1]);
                },
                error: function (e) {
                    console.log("ERROR : ", e);
                },
                cache: false,
                contentType: false,
                processData: false
            });
                       

            var table = $('#myTable').DataTable({
                "ajax": "Content/ajaxOutput.json",
                "dataSrc": "data",
                "columns": [
                    {
                        "className": 'details-control',
                        "orderable": false,
                        "data": null,
                        "defaultContent": ''
                    },
                    { data: "factorName" },
                    { data: "application" }

                ]
                //"bSort": false,
                //"aoColumns": [{ sWidth: "45%" }, { sWidth: "45%" }, { sWidth: "10%", bSearchable: false, bSortable: false }],
                //"scrollY": "200px",
                //"scrollCollapse": true,
                //"info": true,
                //"paging": true
            });


            // Add event listener for opening and closing details
            $('#myTable tbody').on('click', 'td.details-control', function () {
                var tr = $(this).closest('tr');
                var row = table.row(tr);

                if (row.child.isShown()) {
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                }
                else {
                    // Open this row
                    row.child(format(row.data())).show();
                    var editor = ace.edit("codeeditor");
                    editor.setTheme("ace/theme/monokai");
                    editor.getSession().setMode("ace/mode/csharp");
                    editor.setValue("using System;");
                    //var textarea = $('textarea[name="codeeditor"]').hide();
                    //editor.getSession().setValue(textarea.val());
                    //editor.getSession().on('change', function () {
                    //    textarea.val(editor.getSession().getValue());
                    //});
                    //var id = document.getElementById("codeeditor");


                    //editor.session.setValue("the new text here");
                    editor.getSession().setMode("ace/mode/csharp");
                    //id.innerHTML = "using System;" +
                    //    "using System.Data";

                    $('#codeeditor').html(
                        'using System;' + '<br/>' +
                        'using System.Collections.Generic;' + '<br/>' +
                        'using System.Linq;' + '<br/>' +
                        'using System.Net;' + '<br/>' +
                        'using System.Net.Http;' + '<br/>' +
                        'using System.Threading.Tasks;' + '<br/>' +
                        'using System.Web.Http;' + '<br/>' +

                        'namespace CloudValidator.Controllers {' + '<br/>' +
                        'public class ValidateController : ApiController' + '<br/>' +
                        '{' + '<br/>' +
                        'public async Task < IHttpActionResult > UploadProject() {' + '<br/>' +
                        '   return Json(new { hello = "world" });' + '<br/>' +
                        '}' + '<br/>' +
                        '}' + '<br/>' +
                        '}'
                    );

                    //
                    //var id = document.getElementById("codeeditor");
                    //id.innerHTML = "using System;\n" +
                    //    "using System.Data";
                    //document.getElementById("codeeditor").innerHTML = "using System;";

                    // editor.setValue("using System;", -1);


                    //var editor = CodeMirror.fromTextArea(document.getElementById("codeeditor"),
                    //    {
                    //        mode: "text/x-csharp"
                    //    });


                    tr.addClass('shown');
                }
            });


            /* Formatting function for row details - modify as you need */
            function format(d) {
                var www = '<div id="codeeditor"></div>';
                
                return '<div>' +
                    '<section class="intro">' +
                    '<row>' +
                    '<div class="col-lg-4 col-sm-12 left">' +

                    '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">' +
                    '<div class="panel panel-default">' +
                    '<div class="panel-heading" role="tab" id="headingOne">' +
                    '<h4 class="panel-title">' +
                    '<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">' +
                    'Inclusive Conditions' +
                    '</a>' +
                    '</h4>' +
                    '</div>' +
                    '<div id="collapseOne" class="panel-collapse collapse show" role="tabpanel" aria-labelledby="headingOne">' +
                    '<div class="panel-body">' +
                    

                    '<u><b>Rule 1:</b></u>' + '<br/><br/>' +

                    '<u>Condition 1:</u>' + '<br/>' +
                    'Condition Type:ContainsAny' + '<br/>' +
                    'Condition value:Console.,.WriteLine(' + '<br/><br/>' +

                    '<u>Condition 2:</u>' + '<br/>' +
                    'Condition Type:SearchOnlyIn' + '<br/>' +
                    'Condition value:*.cs' + '<br/><br/>' +


                    '<u>Condition 3:</u>' + '<br/>' +
                    'Condition Type:CaseSenitive' + '<br/>' +
                    'Condition value:false' + '<br/>' +

                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +

                    '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">' +
                    '<div class="panel panel-default">' +
                    '<div class="panel-heading" role="tab" id="headingOne">' +
                    '<h4 class="panel-title">' +
                    '<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">' +
                    'Exclusive Conditions' +
                    '</a>' +
                    '</h4>' +
                    '</div>' +
                    '<div id="collapseTwo" class="panel-collapse collapse show" role="tabpanel" aria-labelledby="headingOne">' +
                    '<div class="panel-body">' +
                    

                    '<u><b>Rule 1:</b></u>' + '<br/><br/>' +

                    '<u>Condition 1:</u>' + '<br/>' +
                    'Condition Type:ContainsAny' + '<br/>' +
                    'Condition value:Console.,.WriteLine(' + '<br/><br/>' +

                    '<u>Condition 2:</u>' + '<br/>' +
                    'Condition Type:SearchOnlyIn' + '<br/>' +
                    'Condition value:*.cs' + '<br/><br/>' +


                    '<u>Condition 3:</u>' + '<br/>' +
                    'Condition Type:CaseSenitive' + '<br/>' +
                    'Condition value:false' + '<br/>' +

                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +


                    '</div>' +






                    '<div class="col-lg-4 col-sm-12 left">' +
                    '<p>Center</p>' +
                    www +
                    '</div>' +

                    '<div class="col-lg-4 col-sm-12 left">' +
                    '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">' +
                    '<div class="panel panel-default">' +
                    '<div class="panel-heading" role="tab" id="headingOne">' +
                    '<h4 class="panel-title">' +
                    '<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">' +
                    'Recommendations' +
                    '</a>' +
                    '</h4>' +
                    '</div>' +
                    '<div id="collapseOne" class="panel-collapse collapse show" role="tabpanel" aria-labelledby="headingOne">' +
                    '<div class="panel-body">' +


                    '<u><b>Recommendations 1:</b></u>' + '<br/><br/>' +

                    '<b>Should Use External Logging like Log4Net,Serilog instead of File and Event Logs in Code' + '</b><br/>' +



                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +



                    '</div>' +

                    '<row>' +

                    '</section>' +

                    '</div>';


                // `d` is the original data object for the row
                //return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
                //    '<tr>' +
                //    '<td>Full name:</td>' +
                //    '<td>' + d.factorName + '</td>' +
                //    '</tr>' +
                //    '<tr>' +
                //    '<td>Extension number:</td>' +
                //    '<td>' + d.application + '</td>' +
                //    '</tr>' +
                //    '<tr>' +
                //    '<td>Extra info:</td>' +
                //    '<td>And any further details here (images etc)...</td>' +
                //    '</tr>' +
                //    '</table>';
            }


            //$('#myTable').dataTable({
            //    ajax: {
            //        'type': 'POST',
            //        'url': 'http://localhost:56786/api/validate',
            //        'xhrFields': { withCredentials: false },
            //        'contentType': 'application/json',
            //        'crossDomain': true,
            //        'data': {
            //            "Application": "DotNet",
            //            "FolderName":"helloworld_v1",
            //            "Factors": ["Logs", "Config"]
            //        },
            //        'success': function(data) {

            //        },
            //        'error': function (requestObject, errorMessage, exception) {
            //            alert("Error occured ");
            //        }
            //    },
            //    columns: [
            //        { data: 'factorName' },
            //        { data: 'application' }
            //    ],
            //    bSort: false,
            //    aoColumns: [{ sWidth: "45%" }, { sWidth: "45%" }, { sWidth: "10%", bSearchable: false, bSortable: false }],
            //    "scrollY": "200px",
            //    "scrollCollapse": true,
            //    "info": true,
            //    "paging": true
            //});

        }

        self.getValidationResponse = function (location) {
            var factors = [];
            $.each($('input:checked'), (i, val) => {
                factors.push(val.value);
            });
            var postData = {
                Application: "DotNet",
                FolderName: location,
                Factors: factors
            }
            $.ajax({
                type: 'POST',
                url: 'http://localhost:56786/api/validate',
                xhrFields: { withCredentials: false },
                contentType: 'application/json',
                crossDomain: true,
                data: JSON.stringify(postData),
                success: function (data) {
                    self.prepareComplianceReport(data);
                },
                error: function (requestObject, errorMessage, exception) {
                    alert("Error occured ");
                }
            });
        }

        self.prepareComplianceReport = function (data) {
            self.isInputPanelCollapsed(true);
            self.isValidationComplete(true);
            self.drawPieChart();
            //$.each(data, (i, val) => {

            //});
        }

        self.showInputSection = function () {
            self.isInputPanelCollapsed(false);
        }

        self.drawPieChart = function (data) {
            Morris.Donut({
                element: 'compliance_chart',
                data: [{
                    label: "Unverified",
                    value: 7
                }, {
                    label: "Passed",
                    value: 3
                }, {
                    label: "Failed",
                    value: 2
                }],
                resize: true,
                colors: ["#3980b5", "#58d68d", "#fd7364"]
            });
        }
    }



    var vm = new ValidatorViewModel();
    ko.applyBindings(vm);
});