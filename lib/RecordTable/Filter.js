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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { IconButton, Popper, DialogActions, DialogContent, Button, Checkbox, FormControlLabel, FormGroup, Autocomplete, TextField } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import styles from '../index.module.css';
import { MRTableContext, } from '.';
export default (function (_a) {
    var column = _a.column, index = _a.index, value = _a.value, onChange = _a.onChange;
    var context = React.useContext(MRTableContext);
    var filterInfo = context.filterInfo;
    var filters = (filterInfo === null || filterInfo === void 0 ? void 0 : filterInfo.filters) ? filterInfo === null || filterInfo === void 0 ? void 0 : filterInfo.filters(column, index) : column.filters;
    if (!filters)
        return null;
    var mode = (filterInfo === null || filterInfo === void 0 ? void 0 : filterInfo.filterMode) ? filterInfo === null || filterInfo === void 0 ? void 0 : filterInfo.filterMode(column, index) : column.filterMode;
    var _b = __read(React.useState([]), 2), values = _b[0], setValues = _b[1];
    var _c = __read(React.useState(null), 2), anchorEl = _c[0], setAnchorEl = _c[1];
    React.useEffect(function () {
        if (value)
            setValues(value);
    }, [value]);
    var reset = function (e) {
        e.stopPropagation();
        setValues([]);
    };
    var onConfirm = function (e) {
        e.stopPropagation();
        onChange(values);
        closePopper();
    };
    var showPopper = function (e) {
        e.stopPropagation();
        setAnchorEl(e.currentTarget);
    };
    var closePopper = function () {
        setAnchorEl(null);
        document.removeEventListener('click', closePopper);
        document.body.click();
    };
    React.useEffect(function () {
        if (anchorEl)
            document.addEventListener('click', closePopper);
    }, [anchorEl]);
    var sxProps = {
        width: '200px'
    };
    var renderFilters = function () {
        switch (mode) {
            case 'input':
                return (_jsx(TextField, { value: values[0], onChange: function (e) { return setValues([e.target.value]); }, size: "small", sx: sxProps, placeholder: "please input" }));
            case 'autoComplete':
                return (_jsx(Autocomplete, { multiple: true, options: filters, renderInput: function (p) { return _jsx(TextField, __assign({}, p, { placeholder: "please select" })); }, getOptionKey: function (o) { return o.id; }, getOptionLabel: function (o) { return o.name; }, size: "small", sx: sxProps, value: filters.filter(function (f) { return values.includes(f.id); }), onChange: function (e, v) { return setValues(v.map(function (f) { return f.id; })); } }));
            case 'checkbox':
            default:
                return (_jsx(FormGroup, { children: filters.map(function (filter) { return (_jsx(FormControlLabel, { control: _jsx(Checkbox, { checked: values.includes(filter.id), onChange: function (e) {
                                if (e.target.checked) {
                                    setValues(__spreadArray(__spreadArray([], __read(values), false), [filter.id], false));
                                }
                                else {
                                    setValues(values.filter(function (v) { return v !== filter.id; }));
                                }
                            } }), label: filter.name }, filter.id)); }) }));
        }
    };
    var popperProps = {
        open: !!anchorEl,
        anchorEl: anchorEl,
        placement: "bottom-end",
        className: styles["mr-table-filter-popper"],
        onClick: function (e) { return e.stopPropagation(); },
    };
    if (filterInfo === null || filterInfo === void 0 ? void 0 : filterInfo.popperProps) {
        if (typeof filterInfo.popperProps === 'function') {
            popperProps = Object.assign({}, popperProps, filterInfo.popperProps(column, index));
        }
        else {
            popperProps = Object.assign({}, popperProps, filterInfo.popperProps);
        }
    }
    var FilterIcon = FilterAltIcon;
    if (filterInfo === null || filterInfo === void 0 ? void 0 : filterInfo.filterIcon) {
        FilterIcon = filterInfo.filterIcon(column, index);
    }
    return (_jsxs(_Fragment, { children: [_jsx(IconButton, __assign({ size: 'small', sx: { float: 'right' }, onClick: showPopper }, { children: _jsx(FilterIcon, { fontSize: "small" }) })), _jsxs(Popper, __assign({}, popperProps, { children: [_jsx(DialogContent, { children: renderFilters() }), _jsxs(DialogActions, { children: [_jsx(Button, __assign({ size: 'small', variant: "text", disabled: !values.length, onClick: reset }, { children: "reset" })), _jsx(Button, __assign({ size: 'small', variant: "contained", onClick: onConfirm }, { children: "confirm" }))] })] }))] }));
});
//# sourceMappingURL=Filter.js.map