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
});