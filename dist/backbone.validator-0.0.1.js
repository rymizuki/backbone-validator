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

    Backbone.Validator = Validator;
})();

(function () {
    'use strict';

    var Result = function (args) {
        this.rules = args.rules;
        this.errors = [];
    };

    _.extend(Result.prototype, {
        "has_error": function () {
            return this.errors.length > 0 ? true : false;
        },
        "get_errors": function () {
            return this.has_error() ? this.errors : null;
        },
        "get_error": function (column, method) {
            return _(this.errors).find(function (err) {
                return err.column === column && err.method == method;
            });
        },
        "set_error": function (method, column, value) {
            if (!this.exists_column(column)) {
                return false;
            }

            var err = {
                "method": method,
                "column": column,
                "value" : value
            };

            this.errors.push(err);

            return err;
        },
        "exists_column": function (column) {
            return this.rules[column] ? true : false;
        }
    });

    Backbone.Validator.Result = Result;
})();

(function () {
    'use strict';

    _.extend(Backbone.Validator.CONSTRAINT, {
        "DEFAULTS": {
            "required": function (value) {
                return value && value.length > 0 ? true : false;
            },
            "length": function (value, min, max) {
                return min <= value.length && value.length <= max ? true : false;
            },
            "select": function (value, items) {
                return value && _.indexOf(items, value) >= 0 ? true : false;
            }
        },
    });
})();
