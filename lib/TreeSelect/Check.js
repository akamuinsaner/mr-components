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
import { jsx as _jsx } from "react/jsx-runtime";
import Checkbox from '@mui/material/Checkbox';
export default (function (_a) {
    var show = _a.show, option = _a.option, selected = _a.selected, setSelected = _a.setSelected, allChildrenMap = _a.allChildrenMap;
    if (!show)
        return null;
    var styles = { padding: '0', marginRight: '5px' };
    var acwcIds = (allChildrenMap
        .get(option.id) || [])
        .filter(function (c) { return !(c.children && c.children.length); })
        .map(function (c) { return c.id; });
    var checked = selected.includes(option.id)
        || (acwcIds.length && acwcIds.every(function (id) { return selected.includes(id); }));
    var indeterminate = acwcIds.some(function (id) { return selected.includes(id); })
        && !acwcIds.every(function (id) { return selected.includes(id); });
    var onCheck = function (e) {
        var checked = e.target.checked;
        if (checked) {
            if (!!acwcIds.length)
                setSelected(Array.from(new Set(__spreadArray(__spreadArray([], __read(selected), false), __read(acwcIds), false))));
            else
                setSelected(Array.from(new Set(__spreadArray(__spreadArray([], __read(selected), false), [option.id], false))));
        }
        else {
            if (!!acwcIds.length)
                setSelected(selected.filter(function (id) { return !acwcIds.includes(id); }));
            else
                setSelected(selected.filter(function (id) { return id !== option.id; }));
        }
    };
    return (_jsx(Checkbox, { sx: styles, onClick: function (e) { return e.stopPropagation(); }, onChange: onCheck, checked: checked, indeterminate: indeterminate }));
});
//# sourceMappingURL=Check.js.map