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
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { ruleCheck } from './helpers';
import { FormContext } from './Form';
import Grid from '@mui/material/Grid';
var valueHelper = function (e, checkable) {
    var _a;
    if (checkable)
        return e.target.checked;
    if ((e === null || e === void 0 ? void 0 : e.target) && ((_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.value) !== null)
        return e.target.value;
    return e;
};
var FormItem = function (_a) {
    var name = _a.name, _b = _a.checkable, checkable = _b === void 0 ? false : _b, multiple = _a.multiple, children = _a.children, _c = _a.rules, rules = _c === void 0 ? [] : _c, gridProps = _a.gridProps;
    var context = React.useContext(FormContext);
    var instance = context.instance, size = context.size, disabled = context.disabled, layout = context.layout, itemProps = context.gridProps.itemProps;
    var getSafeValue = function (value) {
        if (value)
            return value;
        if (multiple)
            return [];
        if (checkable)
            return false;
        return '';
    };
    var _this = React.useRef({});
    var _d = __read(React.useState(getSafeValue()), 2), value = _d[0], setValue = _d[1];
    var _e = __read(React.useState(null), 2), error = _e[0], setError = _e[1];
    var _setError = React.useCallback(function (error) {
        setError(error);
    }, []);
    var _setValue = React.useCallback(function (v) {
        var value = getSafeValue(v);
        setValue(value);
    }, []);
    var _getValue = React.useCallback(function () {
        return value;
    }, [value]);
    var _validate = React.useCallback(function (cb) {
        var err = errorCheck(value);
        setError(err);
        cb(err, value);
    }, [value]);
    _this.current = __assign(__assign({}, _this.current), { setError: _setError, setValue: _setValue, getValue: _getValue, validate: _validate });
    React.useEffect(function () {
        instance.wire(name, _this);
        return function () {
            instance.unWire(name);
        };
    }, []);
    React.useEffect(function () {
        _setValue(instance.getFieldValue(name));
    }, []);
    var errorCheck = React.useCallback(function (value) {
        if (!rules || !rules.length)
            return '';
        return ruleCheck(name, value, rules);
    }, [name]);
    var valueOnChange = React.useCallback(function (e) {
        var value = valueHelper(e, checkable);
        setError(errorCheck(value));
        setValue(value);
        instance.setFieldValue(name, value);
    }, []);
    var required = !!rules.find(function (item) { return item.required; });
    var props = {
        value: value,
        onChange: valueOnChange,
        error: !!error,
        helperText: error,
        required: required,
        size: size,
        disabled: disabled,
    };
    var subComponent;
    if (typeof children === 'function') {
        subComponent = children(props);
    }
    else {
        subComponent = children;
    }
    var preChildren = React.cloneElement(subComponent, __assign(__assign({ size: size, disabled: disabled }, subComponent.props), props));
    if (layout === 'Grid') {
        return _jsx(Grid, __assign({}, (itemProps || {}), gridProps, { item: true }, { children: preChildren }));
    }
    return preChildren;
};
export default FormItem;
//# sourceMappingURL=Item.js.map