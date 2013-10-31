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
