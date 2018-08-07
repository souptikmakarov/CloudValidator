var factorData = [];
$(function () {
    function GetBaseUrl() {
        return window.location.origin;
    }

    function FactorCardData() {
        var self = this;
        self.FactorName = "";
        self.TotalFiles = "";
        self.PassedFiles = "";
        self.FailedFiles = "";
        self.Status = true;
    }

    function DetailReport() {
        var self = this;
        self.FactorName = "";
        self.FileName = "";
        self.Status = "";
        self.ResponseData = "";
    }

    var factorDetailTable = $('#myTable').DataTable({
        "data": factorData,
        "columns": [
            {
                "className": 'details-control',
                "orderable": false,
                "data": null,
                "defaultContent": ''
            },
            { data: "FactorName" },
            { data: "FileName" },
            { data: "Status" }

        ],
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": false,
        "info": false
    });

    function ValidatorViewModel() {
        var self = this;
        self.codeSourceType = ko.observable("folder");
        self.codeSourceLink = ko.observable();
        self.factorWiseReport = ko.observableArray([]);
        self.isValidationComplete = ko.observable(false);
        self.isInputPanelCollapsed = ko.observable(false);
        self.FactorCards = ko.observableArray([]);
        self.responseData = ko.observable();

        //self.factorStatus = ko.pureComputed(function () {
        //    return this.Status() ? "panel-green" : "panel-red";
        //}, self);

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

        function DocumentUplod(fd) {
            if (self.codeSourceType() == "folder") {
                //fd.append("CustomField", "This is some extra data");
                $.ajax({
                    url: '/api/Validate/UploadProject',
                    type: 'POST',
                    data: fd,
                    success: function (data) {
                        data = data.filename.split('\\');
                        self.getValidationResponse(data[data.length - 2] + '\\' + data[data.length - 1]);
                    },
                    error: function (e) {
                        console.log("ERROR : ", e);
                    },
                    cache: false,
                    contentType: false,
                    processData: false
                });
            }
            else {

                $.ajax({
                    url: '/api/Validate/DownloadGitCode',
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify({ Url: self.codeSourceLink() }),
                    success: function (data) {
                        data = data.split('\\');
                        self.getValidationResponse(data[data.length - 2] + '\\' + data[data.length - 1]);
                    },
                    error: function (e) {
                        console.log("ERROR : ", e);
                    },

                });

            }

        } 

        self.Validate = function (data, e) {
            if (FileObject == undefined && self.codeSourceLink() == "") {
                alert("Please upload the folder");
                return false;
            }
            
            var fd = new FormData();
            fd.append('file', FileObject);

            DocumentUplod(fd);
        }

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

        self.getValidationResponse = function (location) {
            console.log(location);
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
            self.drawPieChart();
            console.log(data);
            self.responseData(data);
            $.each(data, (i, val) => {
                var fcd = new FactorCardData();
                fcd.FactorName = val.factorName;
                fcd.TotalFiles = val.responseInfo.length;
                var passFiles = 0;
                var failFiles = 0;
                $.each(val.responseInfo, (j, val2) => {
                    var dr = new DetailReport();
                    dr.FactorName = val.factorName;
                    var fn = val2.fileName.split('\\');
                    dr.FileName = fn[fn.length - 1];
                    var status = false;
                    $.each(val2.excludeInfo, (k, val3) => {
                        status = status || val3.ruleOverAllStatus;
                    });
                    dr.Status = status ? "Failed" : "Passed";
                    if (status)
                        failFiles += 1;
                    else
                        passFiles += 1;
                    dr.ResponseData = val2;
                    self.factorWiseReport.push(dr);
                });
                fcd.PassedFiles = passFiles;
                fcd.FailedFiles = failFiles;
                fcd.Status = (failFiles == 0);
                self.FactorCards.push(fcd);
            });
            self.isValidationComplete(true);

            
        }

        self.showDetailReport = function (factorName) {
            factorData = self.factorWiseReport().filter(function (obj) {
                return obj.FactorName == factorName;
            });
            factorDetailTable.clear().rows.add(factorData).draw();
            
        }

        self.showInputSection = function () {
            self.isInputPanelCollapsed(false);
        }

        self.drawPieChart = function (data) {
            setTimeout(function () {
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
            }, 100);
        }

        //Add event listener for opening and closing details
        $('#myTable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).closest('tr');
            var row = factorDetailTable.row(tr);
            console.log(row.data());
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


                tr.addClass('shown');
            }
        });
    }

    


    var vm = new ValidatorViewModel();
    ko.applyBindings(vm);
});