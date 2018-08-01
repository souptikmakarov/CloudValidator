$(function () {
    function ValidatorViewModel() {
        var self = this;
        self.codeSourceType = ko.observable("folder");
        self.codeSourceLink = ko.observable();

        //self.codeSource.subscribe(function () {
        //    if (self.codeSource() == "folder") {

        //    }
        //});
        self.Validate = function () {

        }
    }

    var vm = new ValidatorViewModel();
    ko.applyBindings(vm);
});