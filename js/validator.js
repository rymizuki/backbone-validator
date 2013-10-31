(function () {
    "use strict";

    var Validator = function (rules) {
        this.rules   = rules;
        this.columns = _.keys(this.rules);
        this.constraints = undefined;
    };

    Validator.DEFAULTS = {
        "AUTO_VALIDATION": false
    };
    Validator.CONSTRAINT = {};

    _.extend(Validator.prototype, Backbone.Event, {
        "validate": function (data) {
            var that = this;

            if (!this.constraints) {
                this.load_constraint(Backbone.Validator.CONSTRAINT.DEFAULTS);
            }

            var errors = this.create_result();

            _(this.columns).each(function (column) {
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

    Backbone.Validator = Validator;
})();
