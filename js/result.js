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
