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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/ListItem';
import ExpandIcon from './ExpandIcon';
import Check from '../TreeSelect/Check';
export default (function (_a) {
    var dense = _a.dense, parentId = _a.parentId, showCheck = _a.showCheck, search = _a.search, multiple = _a.multiple, selected = _a.selected, inputValue = _a.inputValue, flatOptions = _a.flatOptions, setSelected = _a.setSelected, allChildrenMap = _a.allChildrenMap, setFlattedOptions = _a.setFlattedOptions, loadData = _a.loadData, openChildren = _a.openChildren;
    var _b = __read(React.useState(null), 2), loadingId = _b[0], setLoadingId = _b[1];
    var onSelect = function (o) {
        if (multiple) {
            if (selected.includes(o.id)) {
                setSelected(selected.filter(function (s) { return s !== o.id; }));
            }
            else {
                setSelected(__spreadArray(__spreadArray([], __read(selected), false), [o.id], false));
            }
        }
        else {
            setSelected([o.id]);
        }
    };
    var startLoadData = function (option) {
        if (!loadData)
            return;
        setLoadingId(option.id);
        loadData(option).then(function (data) {
            setFlattedOptions(flatOptions
                .map(function (item) { return (item.id === option.id ? __assign(__assign({}, item), { children: data }) : item); })
                .concat(data.map(function (item) { return (__assign(__assign({}, item), { parentId: option.id })); })));
            openChildren(option.id);
        }).finally(function () {
            setLoadingId(null);
        });
    };
    var renderOptionItem = function (option) {
        var hasChildren = !!flatOptions.find(function (o) { return o.parentId === option.id; });
        var itemSelected = selected.includes(option.id);
        var isLoading = loadingId === option.id;
        return (_jsxs(ListItem, __assign({ dense: dense, sx: {
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }, selected: itemSelected, secondaryAction: _jsx(ExpandIcon, { loadData: loadData, hasChildren: hasChildren, isLoading: isLoading, openChildren: function () { return openChildren(option.id); }, startLoadData: function () { return startLoadData(option); } }), onClick: function (e) {
                multiple && e.stopPropagation();
                onSelect(option);
            } }, { children: [_jsx(Check, { option: option, show: showCheck, selected: selected, setSelected: setSelected, allChildrenMap: allChildrenMap }), _jsx(Typography, { children: option.name })] }), option.id));
    };
    var filterOptionsByInput = function (options) {
        var e_1, _a;
        var filteredIds = [];
        try {
            for (var _b = __values(allChildrenMap.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], list = _d[1];
                var filteredByInput = list
                    .filter(function (l) { return ("".concat(l.name))
                    .indexOf(inputValue) > -1; });
                if (!!filteredByInput.length)
                    filteredIds.push(key);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var filterCondition = function (o) { return filteredIds.includes(o.id) || "".concat(o.name).indexOf(inputValue) > -1; };
        return options.filter(filterCondition);
    };
    var renderOptions = function () {
        var options = flatOptions.filter(function (o) { return o.parentId === parentId; });
        if (search && inputValue)
            options = filterOptionsByInput(options);
        return options.map(function (o) { return renderOptionItem(o); });
    };
    return renderOptions();
});
//# sourceMappingURL=Options.js.map