$(function () {
    var myController = function () {
        var self = this;
        //self.toBeShown = ko.observable(false);

        //self.LoadComponent = function () {
        //    ko.components.register('my-component', {
        //        template: { fromUrl: 'fileReportTemplate.html', maxCacheAge: 1234 },
        //        viewModel: {
        //            createViewModel: function (params, componentInfo) {
        //                var model = new ComponentViewModel();
        //                model.rules.push({
        //                    ruleName: "Hello",
        //                    ruleCondition: "World"
        //                });
        //                model.rules.push({
        //                    ruleName: "Teplate",
        //                    ruleCondition: "Testing"
        //                });
        //                model.recommendations.push({
        //                    text: "Hello",
        //                    data: "World"
        //                });
        //                model.recommendations.push({
        //                    text: "Teplate",
        //                    data: "Testing"
        //                });
        //                return model;
        //            }
        //        }
        //    });
        //    self.toBeShown(true);
        //}
    };

    //function ComponentViewModel(params) {
    //    var self = this;
    //    self.rules = ko.observableArray([]);
    //    self.recommendations = ko.observableArray([]);
    //}

    //var templateFromUrlLoader = {
    //    loadTemplate: function (name, templateConfig, callback) {
    //        if (templateConfig.fromUrl) {
    //            // Uses jQuery's ajax facility to load the markup from a file
    //            var fullUrl = '/Home/FileReportTemplate';
    //            $.get(fullUrl, function (markupString) {
    //                // We need an array of DOM nodes, not a string.
    //                // We can use the default loader to convert to the
    //                // required format.
    //                ko.components.defaultLoader.loadTemplate(name, markupString, callback);
    //            });
    //        } else {
    //            // Unrecognized config format. Let another loader handle it.
    //            callback(null);
    //        }
    //    }
    //};

    

    //// Register it
    //ko.components.loaders.unshift(templateFromUrlLoader);
    var vm = new myController()

    //$('#load_button').on('click', function (e) {
    //    vm.LoadComponent();  
    //});
    ko.applyBindings(vm);


    var editor = ace.edit("codeeditor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/csharp");
    $('#codeeditor').load("http://localhost:6699/api/Validate/ReadFile?path=" + "C:\\My_Files\\Projects\\CloudValidator\\Code\\\\source_20180807215158244\\source\\HomeController.cs" );
});