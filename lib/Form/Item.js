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
import Form from './Form';
import Grid from '@mui/material/Grid';
import { v4 as uuidV4 } from 'uuid';
var valueHelper = function (e) {
    var _a;
    if ((e === null || e === void 0 ? void 0 : e.target) && ((_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.value) !== null)
        return e.target.value;
    return e;
};
var FormItem = function (_a) {
    var name = _a.name, multiple = _a.multiple, children = _a.children, _b = _a.rules, rules = _b === void 0 ? [] : _b, gridProps = _a.gridProps;
    var _this = React.useRef({});
    var _c = __read(React.useState((multiple ? [] : '')), 2), value = _c[0], setValue = _c[1];
    var _d = __read(React.useState(null), 2), error = _d[0], setError = _d[1];
    var _setError = React.useCallback(function (error) {
        setError(error);
    }, []);
    var _setValue = React.useCallback(function (v) {
        var value = (!v && multiple) ? [] : v;
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
        Form.register(name, _this);
        return function () {
            Form.unRegister(name);
        };
    }, []);
    var errorCheck = React.useCallback(function (value) {
        if (!rules || !rules.length)
            return '';
        return ruleCheck(name, value, rules);
    }, [name]);
    var valueOnChange = React.useCallback(function (e) {
        var _a, _b;
        var value = valueHelper(e);
        setError(errorCheck(value));
        setValue(value);
        if ((_a = _this.current) === null || _a === void 0 ? void 0 : _a.emitValue) {
            (_b = _this.current) === null || _b === void 0 ? void 0 : _b.emitValue(value);
        }
    }, []);
    var required = !!rules.find(function (item) { return item.required; });
    var props = {
        value: value,
        onChange: valueOnChange,
        error: !!error,
        helperText: error,
        required: required,
    };
    var subComponent;
    if (typeof children === 'function') {
        subComponent = children(props);
    }
    else {
        subComponent = children;
    }
    if (gridProps) {
        return _jsx(Grid, __assign({}, gridProps, { item: true }, { children: React.cloneElement(subComponent, __assign(__assign(__assign({}, subComponent.props), props), { fullWidth: true })) }));
    }
    return React.cloneElement(subComponent, __assign(__assign(__assign({ key: uuidV4() }, subComponent.props), props), { fullWidth: true }));
};
export default FormItem;
//# sourceMappingURL=Item.js.map