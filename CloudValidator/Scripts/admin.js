$(function () {
    function GetBaseUrl() {
        return window.location.origin;
    }
    function RuleCondition() {
        var self = this;
        self.RuleConditionType = "";
        self.RuleConditionValue = "";
    }
    function Rule() {
        var self = this;
        self.RuleName = "";
        self.RuleConditions = ko.observableArray();
    }
    function AdminViewModel() {
        var self = this;
        self.appType = ko.observable();
        self.factor = ko.observable();
        self.includeRules = ko.observableArray([]);
        self.excludeRules = ko.observableArray([]);

        self.addIncludeRule = function () {
            var r = new Rule();
            r.RuleConditions.push(new RuleCondition());
            self.includeRules.push(r);
        }
        self.addExcludeRule = function () {
            var r = new Rule();
            r.RuleConditions.push(new RuleCondition());
            self.excludeRules.push(r);
        }
        self.saveRule = function () {

        }
        self.addRuleCondition = function (x) {
            x.RuleConditions.push(new RuleCondition());
        }
        self.init = function () {
            var r = new Rule();
            var rn = new Rule();
            r.RuleConditions.push(new RuleCondition());
            rn.RuleConditions.push(new RuleCondition());
            self.includeRules.push(r);
            self.excludeRules.push(rn);
        }

        self.factor.subscribe(function () {
            if (self.appType() !== "") {
                $.ajax({
                    url: GetBaseUrl() + "/api/Admin/GetRules",
                    type: 'GET',
                    async: true,
                    data: {
                        apptype: self.appType(),
                        factor: self.factor()
                    }
                });
            }

        });
    }

    var vm = new AdminViewModel();
    ko.applyBindings(vm);
    //vm.init();
});