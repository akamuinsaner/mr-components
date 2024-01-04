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
import Check from './Check';
import ExpandIcon from './ExpandIcon';
export default (function (_a) {
    var expandKeys = _a.expandKeys, expandAll = _a.expandAll, showCheck = _a.showCheck, search = _a.search, multiple = _a.multiple, selected = _a.selected, inputValue = _a.inputValue, flatOptions = _a.flatOptions, setSelected = _a.setSelected, allChildrenMap = _a.allChildrenMap, setFlattedOptions = _a.setFlattedOptions, loadData = _a.loadData;
    var _b = __read(React.useState(null), 2), loadingId = _b[0], setLoadingId = _b[1];
    var _c = __read(React.useState({}), 2), cascadeOpen = _c[0], setCascadeOpen = _c[1];
    React.useEffect(function () {
        if (expandAll) {
            setCascadeOpen(flatOptions.reduce(function (pre, cur) {
                var _a;
                return (__assign(__assign({}, pre), (_a = {}, _a[cur.id] = true, _a)));
            }, {}));
        }
        else if (expandKeys && expandKeys.length) {
            setCascadeOpen(flatOptions.reduce(function (pre, cur) {
                var _a;
                if (!expandKeys.includes(cur.id))
                    return pre;
                return __assign(__assign({}, pre), (_a = {}, _a[cur.id] = true, _a));
            }, {}));
        }
    }, [expandAll, expandKeys, flatOptions]);
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
    var toggleOpen = function (id, open) {
        var _a;
        setCascadeOpen(__assign(__assign({}, cascadeOpen), (_a = {}, _a[id] = open, _a)));
    };
    var startLoadData = function (option) {
        if (!loadData)
            return;
        setLoadingId(option.id);
        loadData(option).then(function (data) {
            setFlattedOptions(flatOptions
                .map(function (item) { return (item.id === option.id ? __assign(__assign({}, item), { children: data }) : item); })
                .concat(data.map(function (item) { return (__assign(__assign({}, item), { parentId: option.id })); })));
            toggleOpen(option.id, true);
        }).finally(function () {
            setLoadingId(null);
        });
    };
    var renderOptionItem = function (option, depth, children) {
        var itemSelected = selected.includes(option.id);
        var hasChildren = children && children.length;
        var showChildren = cascadeOpen[option.id];
        var isLoading = loadingId === option.id;
        var visibility = hasChildren || !!loadData;
        return (_jsxs(ListItem, __assign({ sx: {
                paddingLeft: "".concat(depth * 20 + 16, "px"),
                cursor: 'pointer'
            }, dense: true, selected: itemSelected, onClick: function (e) {
                multiple && e.stopPropagation();
                onSelect(option);
            } }, { children: [_jsx(ExpandIcon, { hasChildren: hasChildren, showChildren: showChildren, isLoading: isLoading, visibility: visibility, toggleOpen: function (open) { return toggleOpen(option.id, open); }, startLoadData: function () { return startLoadData(option); } }), _jsx(Check, { option: option, show: showCheck, selected: selected, setSelected: setSelected, allChildrenMap: allChildrenMap }), _jsx(Typography, { children: option.name })] }), option.id));
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
    var renderOptions = function (parentId, depth) {
        if (parentId === void 0) { parentId = ''; }
        if (depth === void 0) { depth = 0; }
        var options = flatOptions.filter(function (o) { return o.parentId === parentId; });
        if (search && inputValue)
            options = filterOptionsByInput(options);
        return __spreadArray([], __read(options.map(function (o) {
            var children = flatOptions.filter(function (item) { return item.parentId === o.id; });
            var hasChildren = children && children.length;
            var showChildren = cascadeOpen[o.id];
            var renders = [renderOptionItem(o, depth, children)];
            if (showChildren && hasChildren)
                renders = __spreadArray(__spreadArray([], __read(renders), false), __read(renderOptions(o.id, depth + 1)), false);
            return renders;
        })), false);
    };
    return renderOptions();
});
//# sourceMappingURL=Options.js.map