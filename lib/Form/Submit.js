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
import Grid from '@mui/material/Grid';
import { FormContext } from './Form';
var Submit = function (_a) {
    var children = _a.children, gridProps = _a.gridProps;
    var context = React.useContext(FormContext);
    var instance = context.instance, size = context.size, disabled = context.disabled, layout = context.layout, itemProps = context.gridProps.itemProps;
    var preChildren = React.cloneElement(children, __assign(__assign({ size: size, disabled: disabled, type: 'submit' }, children.props), { onClick: function () {
            if ('onClick' in children.props) {
                children.props.onClick();
            }
        } }));
    if (layout === 'Grid') {
        return _jsx(Grid, __assign({}, (itemProps || {}), gridProps, { item: true }, { children: preChildren }));
    }
    return preChildren;
};
export default Submit;
//# sourceMappingURL=Submit.js.map