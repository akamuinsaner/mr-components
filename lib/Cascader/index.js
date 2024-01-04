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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Chip from '@mui/material/Chip';
import Tag from '../TreeSelect/Tag';
import { flatOptions, idAllChildrenMap } from '../TreeSelect/helper';
import DropDown from './DropDown';
import Options from './Options';
var Cascader = function (_a) {
    var _b = _a.search, search = _b === void 0 ? false : _b, options = _a.options, _c = _a.multiple, multiple = _c === void 0 ? false : _c, _d = _a.checkable, checkable = _d === void 0 ? false : _d, _e = _a.popperStyle, popperStyle = _e === void 0 ? {} : _e, popperClassName = _a.popperClassName, value = _a.value, onChange = _a.onChange, loadData = _a.loadData, _f = _a.allowClear, allowClear = _f === void 0 ? false : _f, _g = _a.maxTagCount, maxTagCount = _g === void 0 ? 0 : _g, inputProps = __rest(_a, ["search", "options", "multiple", "checkable", "popperStyle", "popperClassName", "value", "onChange", "loadData", "allowClear", "maxTagCount"]);
    var inputRef = React.useRef(null);
    var eleRef = React.useRef(null);
    var _h = __read(React.useState([]), 2), tagWidths = _h[0], setTagWidths = _h[1];
    var _j = __read(React.useState(false), 2), initialized = _j[0], setInitialized = _j[1];
    var _k = __read(React.useState(null), 2), anchorEl = _k[0], setAnchorEl = _k[1];
    var _l = __read(React.useState(false), 2), hovering = _l[0], setHovering = _l[1];
    var _m = __read(React.useState([]), 2), selected = _m[0], setSelected = _m[1];
    var _o = __read(React.useState(10000), 2), tagLimit = _o[0], setTagLimit = _o[1];
    var _p = __read(React.useState(''), 2), inputValue = _p[0], setInputValue = _p[1];
    var _q = __read(React.useState(flatOptions(options)), 2), flattedOptions = _q[0], setFlattedOptions = _q[1];
    var _r = __read(React.useState(new Map()), 2), allChildrenMap = _r[0], setAllChildrenMap = _r[1];
    var _s = __read(React.useState([""]), 2), openKeys = _s[0], setOpenKeys = _s[1];
    React.useEffect(function () {
        setAllChildrenMap(idAllChildrenMap(options));
    }, [flattedOptions]);
    var calculateTagLimit = function () {
        var inputWidth = inputRef.current.offsetWidth;
        var width = 0;
        for (var i = 0; i < tagWidths.length;) {
            width += tagWidths[0];
            if (inputWidth - width < 150) {
                setTagLimit(i + 1);
                break;
            }
            else {
                i++;
            }
        }
    };
    React.useEffect(function () {
        if (typeof maxTagCount === 'number')
            setTagLimit(maxTagCount || 10000);
        if (maxTagCount === 'responsive') {
            setTagLimit(10000);
            calculateTagLimit();
            window.addEventListener('resize', calculateTagLimit);
        }
        return function () {
            window.removeEventListener('resize', calculateTagLimit);
        };
    }, [maxTagCount, tagWidths, selected]);
    var onClear = function () { return setSelected([]); };
    var openDropDown = function (e) {
        e.stopPropagation();
        setInputValue('');
        setAnchorEl(eleRef.current);
    };
    var closeOptions = function (e) {
        setInputValue('');
        setAnchorEl(null);
        document.removeEventListener('click', closeOptions);
    };
    React.useEffect(function () {
        if (initialized)
            onChange && onChange(multiple ? selected : selected[0]);
        else
            setInitialized(true);
    }, [selected]);
    React.useEffect(function () {
        if (anchorEl)
            setTimeout(function () {
                document.addEventListener('click', closeOptions);
            }, 300);
    }, [anchorEl]);
    var renderInput = function (params) {
        var isFocus = !!anchorEl;
        return (_jsx(TextField, __assign({}, params, inputProps, { ref: inputRef, onClick: function (e) { return e.stopPropagation(); }, focused: isFocus, placeholder: (isFocus && !multiple) ? renderValue() : inputProps.placeholder, sx: {
                '& .MuiAutocomplete-inputRoot': {
                    flexWrap: maxTagCount === 'responsive' ? 'nowrap' : 'wrap'
                }
            } })));
    };
    var renderTags = function (value, getTagProps) {
        var rendered = value.slice(0, tagLimit);
        var rest = value.slice(tagLimit);
        var size = inputProps.size;
        return rendered.map(function (id, index) {
            var o = flattedOptions.find(function (o) { return o.id === id; });
            return (_jsx(Tag, { size: size, onDelete: function (id) {
                    setSelected(selected.filter(function (s) { return s !== id; }));
                    setTagWidths(tagWidths.filter(function (w, i) { return i !== index; }));
                }, option: o, onInit: function (width) {
                    var widths = __spreadArray([], __read(tagWidths), false);
                    widths[index] = width;
                    setTagWidths(widths);
                } }));
        }).concat(rest.length
            ? [_jsx(Chip, { size: size, label: "+".concat(rest.length, "...") })]
            : []);
    };
    var renderPopupIcon = function () {
        if (hovering && selected.length && allowClear) {
            return _jsx(CancelIcon, { onClick: onClear });
        }
        else {
            return _jsx(ArrowDropDownIcon, { onClick: openDropDown });
        }
    };
    var onInputChange = function (e, value, reason) {
        if (reason === 'reset' && multiple)
            return;
        setInputValue(value);
    };
    var renderValue = function () {
        if (multiple)
            return selected;
        var isFocused = !!anchorEl;
        if (isFocused && search) {
            return inputValue;
        }
        var o = flattedOptions.find(function (o) { return o.id === selected[0]; });
        return (o === null || o === void 0 ? void 0 : o.name) || '';
    };
    var renderDropDowns = function () {
        return openKeys.map(function (key, depth) {
            var showCheck = checkable && multiple;
            var dense = inputProps.size === 'small';
            var openChildren = function (id) {
                var a = __spreadArray([], __read(openKeys), false);
                a[depth + 1] = id;
                setOpenKeys(a);
            };
            return (_jsx(DropDown, __assign({ depth: depth, anchorEl: anchorEl, popperStyle: popperStyle, popperClassName: popperClassName }, { children: _jsx(Options, { dense: dense, parentId: key, showCheck: showCheck, search: search, multiple: multiple, selected: selected, inputValue: inputValue, flatOptions: flattedOptions, setSelected: setSelected, allChildrenMap: allChildrenMap, setFlattedOptions: setFlattedOptions, loadData: loadData, openChildren: openChildren }) }), key));
        });
    };
    return (_jsxs(_Fragment, { children: [_jsx(Autocomplete, { ref: eleRef, options: [], open: false, readOnly: !(search && !!anchorEl), multiple: multiple, disableClearable: true, value: renderValue(), onFocus: openDropDown, inputValue: inputValue, onClick: function (e) { return e.stopPropagation(); }, onInputChange: onInputChange, onMouseEnter: function (e) { return setHovering(true); }, onMouseLeave: function (e) { return setHovering(false); }, popupIcon: renderPopupIcon(), renderInput: renderInput, renderTags: renderTags }), renderDropDowns()] }));
};
export default Cascader;
//# sourceMappingURL=index.js.map