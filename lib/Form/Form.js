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
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import FormItem from './Item';
import Submit from './Submit';
import { useForm } from './useForm';
export var FormContext = React.createContext(null);
var Form = function (_a) {
    var _b = _a.size, size = _b === void 0 ? 'medium' : _b, _c = _a.disabled, disabled = _c === void 0 ? false : _c, form = _a.form, children = _a.children, _d = _a.initialValues, initialValues = _d === void 0 ? {} : _d, _e = _a.onValuesChange, onValuesChange = _e === void 0 ? function () { } : _e, onSubmit = _a.onSubmit, layout = _a.layout, _f = _a.stackProps, stackProps = _f === void 0 ? {} : _f, _g = _a.gridProps, gridProps = _g === void 0 ? {} : _g, name = _a.name;
    var instance = useForm(form);
    React.useEffect(function () {
        instance.onValuesChange = onValuesChange;
        instance.setFieldsValue(initialValues);
    }, []);
    var submitForm = function (e) {
        e.preventDefault();
        instance.validates(function (errors, values) {
            if (!errors) {
                onSubmit && onSubmit(values);
            }
        });
    };
    var preChildren = children;
    if (layout === 'Stack') {
        preChildren = _jsx(Stack, __assign({}, stackProps, { children: children }));
    }
    if (layout === 'Grid') {
        preChildren = _jsx(Grid, __assign({}, (gridProps.containerProps || {}), { container: true }, { children: children }));
    }
    return (_jsx(FormContext.Provider, __assign({ value: {
            instance: instance,
            size: size,
            layout: layout,
            gridProps: gridProps,
            disabled: disabled
        } }, { children: _jsx("form", __assign({ noValidate: true, onSubmit: submitForm }, { children: preChildren })) })));
};
Form.Item = FormItem;
Form.Submit = Submit;
Form.useForm = useForm;
export default Form;
//# sourceMappingURL=Form.js.map