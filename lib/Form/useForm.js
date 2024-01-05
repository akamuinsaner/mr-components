var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import React from 'react';
var FormInstance = /** @class */ (function () {
    function FormInstance() {
        var _this_1 = this;
        this.wire = function (name, _this) {
            _this_1.wired[name] = _this;
        };
        this.unWire = function (name) {
            delete _this_1.store[name];
            delete _this_1.wired[name];
        };
        this.onValuesChange = function (prev, cur) {
        };
        this.getFieldsValue = function (names) {
            if (names) {
                return names.reduce(function (pre, key) {
                    var _a;
                    return key in _this_1.store
                        ? __assign(__assign({}, pre), (_a = {}, _a[key] = _this_1.store[key], _a)) : pre;
                }, {});
            }
            return _this_1.store;
        };
        this.getFieldValue = function (name) {
            return _this_1.store[name];
        };
        this.setFieldValue = function (name, value) {
            var _a;
            var oldStore = __assign({}, _this_1.store);
            _this_1.store = __assign(__assign({}, _this_1.store), (_a = {}, _a[name] = value, _a));
            _this_1.wired[name].current.setValue(value);
            _this_1.onValuesChange(oldStore, _this_1.store);
        };
        this.setFieldsValue = function (values) {
            var oldStore = __assign({}, _this_1.store);
            _this_1.store = __assign(__assign({}, _this_1.store), values);
            if (!_this_1.initialized) {
                _this_1.initialValues = _this_1.store;
                _this_1.initialized = true;
            }
            Object.entries(values).forEach(function (_a) {
                var _b = __read(_a, 2), name = _b[0], value = _b[1];
                _this_1.wired[name].current.setValue(value);
            });
            _this_1.onValuesChange(oldStore, _this_1.store);
        };
        this.resetFields = function () {
            var oldStore = __assign({}, _this_1.store);
            _this_1.store = __assign({}, _this_1.initialValues);
            Object.entries(_this_1.wired).forEach(function (_a) {
                var _b = __read(_a, 2), name = _b[0], _this = _b[1];
                _this.current.setValue(_this_1.store[name]);
            });
            _this_1.onValuesChange(oldStore, _this_1.store);
        };
        this.scrollToField = function (name) {
            var _this = _this_1.wired[name];
            if (!_this)
                return;
            _this.current.element.scrollIntoView();
        };
        this.validates = function (cb, names) {
            var errors = null;
            var values = {};
            Object.entries(_this_1.wired).forEach(function (_a) {
                var _b = __read(_a, 2), key = _b[0], _this = _b[1];
                if ((names && (names.includes(key))) || !names) {
                    _this.current.validate(function (error, value) {
                        var _a, _b;
                        if (error)
                            errors = Object.assign({}, errors, (_a = {}, _a[key] = error, _a));
                        values = Object.assign({}, values, (_b = {}, _b[key] = value, _b));
                    });
                }
            });
            typeof cb === 'function' && cb(errors, values);
        };
        this.initialized = false;
        this.initialValues = {};
        this.store = {};
        this.wired = {};
    }
    return FormInstance;
}());
var useForm = function (form) {
    var formRef = React.useRef(null);
    if (form) {
        formRef.current = form;
    }
    else {
        formRef.current = new FormInstance();
    }
    return formRef.current;
};
export { useForm };
//# sourceMappingURL=useForm.js.map