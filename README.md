# NAME

Backbone.Validator - 

# SYNOPSIS

## loading scripts

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
<script src="/js/underscore.min.js"></script>
<script src="/js/backbone.min.js"></script>
<script src="/js/backbone.validator.min.js"></script>
<script src="/js/main.js"></script>
```

## basic synopsis

```javascript
'use strict';

var Model = Backbone.Model.extend({
    "defaults": {
        "name"    : null,
        "message" : null,
        "gender"  : null,
    },
    "initialize": function () {
        this.validator = new Backbone.Validator({
            "name"    : ["required", ["length", [1,  32]]],
            "message" : [            ["length", [0, 256]]],
            "gender"  : ["required", ["select", ["male", "female"]]]
        });
    },
    "validate": function (attrs) {
        var result = this.validator.validate(attrs);

        if (result.has_error()) {
            return result;
        } else {
            return;
        }
    },
});

```

## auto validationing mode

```
'use strict';

Backbone.Validator.AUTO_VALIDATION = true;

var Model = Backbone.Model.extend({
    "defaults": {
        "name"    : null,
        "message" : null,
        "gender"  : null,
    },
    "validate_rules" : {
        "name"    : ["required", ["length", [1,  32]]],
        "message" : [            ["length", [0, 256]]],
        "gender"  : ["required", ["select", ["male", "female"]]]
    },
});
```

# METHODS

# VALIDATE RULES
