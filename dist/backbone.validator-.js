(function () {
    "use strict";

    var Validator = function (rules) {
        this.rules   = rules;
        this.columns = _.keys(this.rules);
        this.constraints;
    };
    var Validator.Result = function () {
    };

    Validator.DEFAULTS = {
        "AUTO_VALIDATION": false
    };
    Validator.Constraints= {
        "DEFAULTS": {
            "required": function (value) {
                return value && value.length > 0 ? true : false;
            },
            "select": function (value, items) {
                return value && _.indexOf(items, value) >= true : false;
            }
        }
    };

    _.extend(Validator.prototype, Backbone.Event, {
        "validate": function (data) {
            var that = this;

            if (!this.constraints) {
                this.load_constraint(Validator.Constraints.DEFAULTS);
            }

            var errors = this.create_result();

            _.chain(this.rules).each(function (column) {
                _(that.rules[column]).each(function (method) {
                    var args;
                    if (_.isArray(method)) {
                        args   = method[1];
                        method = method[0];
                    } 

                    if (!that.constraints[method](data[column], args)) {
                        errors.set_error(method, column, data[column]);
                    }
                });
            });

            return errors;
        },
        "create_result": function () {
            return new Backbone.Validator.Result({
                "rules": this.rules
            });
        },
        "load_constraint": function (name, func) {
            var constraints = {};
            if (typeof name === 'object' && !func) {
                constraints = name;
            } else {
                constraints[name] = func;
            }
            this.constraints = _.extend(this.constraints || {}, constraints);
            return this;
        },
    });
})();
