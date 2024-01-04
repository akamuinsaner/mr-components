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
    var anchorEl = _a.anchorEl, placement = _a.placement, initialWidth = _a.initialWidth, popperStyle = _a.popperStyle, popperClassName = _a.popperClassName, children = _a.children;
    if (!initialWidth)
        return;
    var open = !!anchorEl;
    var initialStyles = {
        minWidth: '200px',
        width: initialWidth,
        zIndex: 10000,
        background: '#fff',
        boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)'
    };
    return (_jsx(Popper, __assign({ slot: 'Paper', className: popperClassName, style: popperStyle, sx: initialStyles, open: open, anchorEl: anchorEl, placement: placement }, { children: children })));
});
//# sourceMappingURL=DropDown.js.map