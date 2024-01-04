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
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import FormItem from './Item';
import Submit from './Submit';
var Form = function (_a) {
    var form = _a.form, children = _a.children, _b = _a.initialValues, initialValues = _b === void 0 ? {} : _b, onValuesChange = _a.onValuesChange, submit = _a.submit, layout = _a.layout, _c = _a.stackProps, stackProps = _c === void 0 ? {} : _c, _d = _a.gridProps, gridProps = _d === void 0 ? {} : _d, name = _a.name;
    var fieldValues = React.useRef(Object.assign({}, initialValues));
    var wiredFields = React.useRef({});
    var wiredSubmits = React.useRef([]);
    var fieldsChange = function (values) {
        onValuesChange && onValuesChange(fieldValues.current, values);
        fieldValues.current = values;
    };
    var getValues = React.useCallback(function (fields) {
        if (fields && fields.length) {
            return fields.reduce(function (prev, key) {
                var _a;
                var _b;
                return ((_b = wiredFields.current) === null || _b === void 0 ? void 0 : _b[key])
                    ? __assign(__assign({}, prev), (_a = {}, _a[key] = wiredFields.current[key].current.getValue(), _a)) : __assign({}, prev);
            }, {});
        }
        return Object.entries(wiredFields.current).reduce(function (prev, _a) {
            var _b;
            var _c = __read(_a, 2), key = _c[0], _this = _c[1];
            return __assign(__assign({}, prev), (_b = {}, _b[key] = _this.current.getValue(), _b));
        }, {});
    }, []);
    var setValues = React.useCallback(function (values) {
        Object.entries(values).forEach(function (_a) {
            var _b;
            var _c = __read(_a, 2), key = _c[0], value = _c[1];
            if (key in values)
                (_b = wiredFields.current[key]) === null || _b === void 0 ? void 0 : _b.current.setValue(value);
        });
        fieldsChange(values);
    }, []);
    var clear = React.useCallback(function () {
        Object.entries(wiredFields.current).forEach(function (_a) {
            var _b = __read(_a, 2), key = _b[0], _this = _b[1];
            _this.current.setError('');
        });
        fieldsChange({});
    }, []);
    var reset = React.useCallback(function () {
        Object.entries(wiredFields.current).forEach(function (_a) {
            var _b = __read(_a, 2), key = _b[0], _this = _b[1];
            _this.current.setError('');
            if (key in initialValues) {
                _this.current.setValue(initialValues[key]);
            }
            else {
                _this.current.setValue('');
            }
        });
        fieldsChange(__assign({}, initialValues));
    }, []);
    var validates = React.useCallback(function (cb, fields) {
        var errors = null;
        var values = {};
        Object.entries(wiredFields.current).forEach(function (_a) {
            var _b = __read(_a, 2), key = _b[0], _this = _b[1];
            if ((fields && (fields.includes(key))) || !fields) {
                _this.current.validate(function (error, value) {
                    var _a, _b;
                    if (error)
                        errors = Object.assign({}, errors, (_a = {}, _a[key] = error, _a));
                    values = Object.assign({}, values, (_b = {}, _b[key] = value, _b));
                });
            }
        });
        typeof cb === 'function' && cb(errors, values);
    }, []);
    var submitForm = React.useCallback(function (data) {
        console.log(wiredFields);
        var errors = null;
        var values = {};
        Object.entries(wiredFields.current).forEach(function (_a) {
            var _b = __read(_a, 2), key = _b[0], _this = _b[1];
            _this.current.validate(function (error, value) {
                var _a, _b;
                if (error)
                    errors = Object.assign({}, errors, (_a = {}, _a[key] = error, _a));
                values = Object.assign({}, values, (_b = {}, _b[key] = value, _b));
            });
        });
        if (!errors) {
            if (typeof submit === 'function') {
                if (!data)
                    submit(values);
                if (data && typeof data !== 'function')
                    submit(data);
                if (data && typeof data === 'function')
                    submit(data(values));
            }
        }
    }, []);
    Form.registerSubmits = React.useCallback(function (_this) {
        var order = wiredSubmits.current.length;
        wiredSubmits.current.push(_this);
        _this.current.submit = submitForm;
        _this.current.setOrder(order);
    }, []);
    Form.register = React.useCallback(function (key, _this) {
        var _a;
        if (key in fieldValues.current)
            _this.current.setValue(((_a = fieldValues.current) === null || _a === void 0 ? void 0 : _a[key]) || null);
        _this.current.emitValue = function (value) {
            var _a;
            return fieldsChange(__assign(__assign({}, fieldValues.current), (_a = {}, _a[key] = value, _a)));
        };
        wiredFields.current[key] = _this;
    }, []);
    Form.unRegister = React.useCallback(function (key) {
        delete wiredFields.current[key];
        delete fieldValues.current[key];
    }, []);
    var registerForm = React.useCallback(function () {
        if (form) {
            form["getValues"] = getValues;
            form["setValues"] = setValues;
            form["reset"] = reset;
            form["clear"] = clear;
            form["validates"] = validates;
        }
    }, [form]);
    registerForm();
    var preChildren = children;
    if (layout === 'Stack') {
        preChildren = _jsx(Stack, __assign({}, stackProps, { children: children }));
    }
    if (layout === 'Grid') {
        preChildren = _jsx(Grid, __assign({}, gridProps, { container: true }, { children: children }));
    }
    return _jsx(_Fragment, { children: preChildren });
};
Form.Item = FormItem;
Form.Submit = Submit;
Form.useForm = function () {
    var form = React.useRef({
        clear: function () { },
        reset: function () { },
        setValues: function () { },
        getValues: function () { },
        validates: function () { },
    });
    return form.current;
};
export default Form;
//# sourceMappingURL=Form.js.map