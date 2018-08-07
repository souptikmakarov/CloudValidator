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
        self.Recommendations = "";
        self.Impacts = "";
    }
    function AdminViewModel() {
        var self = this;
        self.appType = ko.observable();
        self.factor = ko.observable();
        self.includeRules = ko.observableArray([]);
        self.excludeRules = ko.observableArray([]);
        self.isLoading = ko.observable(false);
        self.id = ko.observable(false);

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
            loadRule();
        });

        function loadRule() {
            if (self.appType() !== "") {
                self.isLoading(true);
                self.includeRules([]);
                self.excludeRules([]);
                $.ajax({
                    url: GetBaseUrl() + "/api/Admin/GetRules",
                    type: 'GET',
                    async: true,
                    data: {
                        apptype: self.appType(),
                        factor: self.factor()
                    },
                    success: function (data) {
                        var parsed = JSON.parse(data).hits.hits;
                        if (parsed.length == 0) {
                            self.init();
                            self.isLoading(false);
                        }
                        else {
                            self.id(parsed[0]._id);
                            var obj = parsed[0]._source;
                            $.each(obj.Exclude, (i, val) => {
                                var tempRule = new Rule();
                                tempRule.RuleName = val.RuleName;
                                tempRule.Recommendations = val.Recommendations.join(',');
                                tempRule.Impacts = val.Impacts.join(',');
                                $.each(val.RuleConditions, (j, cond) => {
                                    $.each(cond, (key, value) => {
                                        var tempRuleCond = new RuleCondition();
                                        tempRuleCond.RuleConditionType = key;
                                        if (typeof (value) == "object")
                                            tempRuleCond.RuleConditionValue = value.join(',');
                                        else
                                            tempRuleCond.RuleConditionValue = value;
                                        tempRule.RuleConditions.push(tempRuleCond);
                                    });
                                });
                                self.excludeRules.push(tempRule);
                            });
                            $.each(obj.Include, (i, val) => {
                                var tempRule = new Rule();
                                tempRule.RuleName = val.RuleName;
                                $.each(val.RuleConditions, (j, cond) => {
                                    $.each(cond, (key, value) => {
                                        var tempRuleCond = new RuleCondition();
                                        tempRuleCond.RuleConditionType = key;
                                        if (typeof (value) == "object")
                                            tempRuleCond.RuleConditionValue = value.join(',');
                                        else
                                            tempRuleCond.RuleConditionValue = value;
                                        tempRule.RuleConditions.push(tempRuleCond);
                                    });
                                });
                                self.includeRules.push(tempRule);
                            });
                            self.isLoading(false);
                        }
                    },
                    error: function (e) {
                        alert("Error: " + e.statusText);
                        self.isLoading(false);
                    }
                });
            }

        }


        self.saveRule = function () {
            var toStore = {
                Application: self.appType(),
                FactorType: self.factor(),
                Include: [],
                Exclude: []
            };
            $.each(self.includeRules(), (i, val) => {
                var recomm = val.Recommendations == "" ? [] : val.Recommendations.split(',');
                var impact = val.Impacts == "" ? [] : val.Impacts.split(',');

                var tempRule = {
                    RuleName: val.RuleName,
                    RuleConditions: [],
                    Recommendations: recomm,
                    Impacts: impact
                };
                $.each(val.RuleConditions(), (j, cond) => {
                    var tempRuleCond = {};
                    if(typeof(cond.RuleConditionValue) == "string")
                        tempRuleCond[cond.RuleConditionType] = cond.RuleConditionValue.split(',')
                    else
                        tempRuleCond[cond.RuleConditionType] = cond.RuleConditionValue

                    tempRule.RuleConditions.push(tempRuleCond);
                });
                toStore.Include.push(tempRule);
            });
            $.each(self.excludeRules(), (i, val) => {
                var recomm = val.Recommendations == "" ? [] : val.Recommendations.split(',');
                var impact = val.Impacts == "" ? [] : val.Impacts.split(',');
                var tempRule = {
                    RuleName: val.RuleName,
                    RuleConditions: [],
                    Recommendations: recomm,
                    Impacts: impact
                };
                $.each(val.RuleConditions(), (j, cond) => {
                    var tempRuleCond = {};
                    if (typeof (cond.RuleConditionValue) == "string")
                        tempRuleCond[cond.RuleConditionType] = cond.RuleConditionValue.split(',')
                    else
                        tempRuleCond[cond.RuleConditionType] = cond.RuleConditionValue

                    tempRule.RuleConditions.push(tempRuleCond);
                });
                toStore.Exclude.push(tempRule);
            });
            console.log(JSON.stringify(toStore));
            $.ajax({
                url: GetBaseUrl() + "/api/Admin/SetRules",
                type: 'POST',
                async: true,
                data: {
                    Id: self.id(),
                    Rule: JSON.stringify(toStore)
                },
                success: function (data) {
                    if (data.status == "success") {
                        alert("Data saved successfully");
                        loadRule();
                    }
                },
                error: function (e) {
                    alert("Error: " + e.statusText);
                    self.isLoading(false);
                }
            });
        }
    }

    var vm = new AdminViewModel();
    ko.applyBindings(vm);
    //vm.init();
});