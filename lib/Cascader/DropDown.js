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
import Popper from '@mui/material/Popper';
export default (function (_a) {
    var depth = _a.depth, anchorEl = _a.anchorEl, popperStyle = _a.popperStyle, popperClassName = _a.popperClassName, children = _a.children;
    var open = !!anchorEl;
    var width = 240;
    var initialStyles = {
        width: "".concat(width, "px"),
        zIndex: 10000,
        background: '#fff',
        boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)'
    };
    return (_jsx(Popper, __assign({ slot: 'Paper', className: popperClassName, style: popperStyle, sx: initialStyles, open: open, anchorEl: anchorEl, placement: "bottom-start", modifiers: [{ name: 'offset', options: { offset: [depth * width, 0], }, }] }, { children: children })));
});
//# sourceMappingURL=DropDown.js.map