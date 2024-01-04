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
import Form from './Form';
import Grid from '@mui/material/Grid';
var Submit = function (_a) {
    var children = _a.children, data = _a.data, gridProps = _a.gridProps;
    var _this = React.useRef({});
    var order = React.useRef(null);
    var _setOrder = function (o) { return order.current = o; };
    _this.current = __assign(__assign({}, _this.current), { setOrder: _setOrder });
    React.useEffect(function () {
        Form.registerSubmits(_this);
        return function () {
        };
    }, []);
    if (gridProps) {
        return _jsx(Grid, __assign({}, gridProps, { item: true }, { children: React.cloneElement(children, __assign(__assign({}, children.props), { onClick: function () {
                    _this.current.submit(data);
                    if ('onClick' in children.props) {
                        children.props.onClick();
                    }
                } })) }));
    }
    return React.cloneElement(children, __assign(__assign({}, children.props), { type: 'submit', onClick: function () {
            _this.current.submit(data);
            if ('onClick' in children.props) {
                children.props.onClick();
            }
        } }));
};
export default Submit;
//# sourceMappingURL=Submit.js.map