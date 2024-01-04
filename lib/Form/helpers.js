var requireValidate = function (name, value, rule) {
    if ((value === null || value === undefined || value === '') || (Array.isArray(value) && !value.length)) {
        return rule.msg || "".concat(name, " is required");
    }
    return '';
};
var lengthValidate = function (name, value, rule) {
    if (Array.isArray(value) && value.length !== rule.len) {
        return rule.msg || "".concat(name, " requireds length of ").concat(rule.len);
    }
    if (typeof value === 'string' && value.length !== rule.len) {
        return rule.msg || "".concat(name, " requireds length of ").concat(rule.len);
    }
    return '';
};
var maxValidate = function (name, value, rule) {
    if (Array.isArray(value) && value.length > rule.max) {
        return rule.msg || "".concat(name, " cannot be longer then ").concat(rule.max);
    }
    if (typeof value === 'string' && value.length > rule.max) {
        return rule.msg || "".concat(name, " cannot be longer then ").concat(rule.max);
    }
    if (typeof value === 'number' && value > rule.max) {
        return rule.msg || "".concat(name, " cannot be larger then ").concat(rule.max);
    }
    return '';
};
var minValidate = function (name, value, rule) {
    if (Array.isArray(value) && value.length < rule.min) {
        return rule.msg || "".concat(name, " cannot be longer then ").concat(rule.min);
    }
    if (typeof value === 'string' && value.length < rule.max) {
        return rule.msg || "".concat(name, " cannot be longer then ").concat(rule.min);
    }
    if (typeof value === 'number' && value < rule.min) {
        return rule.msg || "".concat(name, " cannot be larger then ").concat(rule.min);
    }
    return '';
};
var regexValidate = function (name, value, rule) {
    if (!rule.regex.test(value))
        return rule.msg || "".concat(name, " should be the format of ").concat(rule.regex);
    return '';
};
export var ruleCheck = function (name, value, rules) {
    for (var i = 0; i < rules.length; i++) {
        var rule = rules[i];
        if (rule.required) {
            var msg = requireValidate(name, value, rule);
            if (msg)
                return msg;
            else
                continue;
        }
        if (rule.len) {
            var msg = lengthValidate(name, value, rule);
            if (msg)
                return msg;
            else
                continue;
        }
        if (rule.max) {
            var msg = maxValidate(name, value, rule);
            if (msg)
                return msg;
            else
                continue;
        }
        if (rule.min) {
            var msg = minValidate(name, value, rule);
            if (msg)
                return msg;
            else
                continue;
        }
        if (rule.regex && !rule.regex.test(value)) {
            var msg = regexValidate(name, value, rule);
            if (msg)
                return msg;
            else
                continue;
        }
    }
    return '';
};
//# sourceMappingURL=helpers.js.map