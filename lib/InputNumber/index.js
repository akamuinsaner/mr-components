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
import * as React from 'react';
import { styled } from '@mui/system';
import { Unstable_NumberInput as BaseNumberInput, numberInputClasses, } from '@mui/base/Unstable_NumberInput';
var InputNumber = React.forwardRef(function CustomNumberInput(props, ref) {
    return (_jsx(BaseNumberInput, __assign({ slots: {
            root: InputRoot,
            input: InputElement,
            incrementButton: Button,
            decrementButton: Button,
        }, slotProps: {
            incrementButton: {
                children: _jsx("span", __assign({ className: "arrow" }, { children: "\u25B4" })),
            },
            decrementButton: {
                children: _jsx("span", __assign({ className: "arrow" }, { children: "\u25BE" })),
            },
        } }, props, { ref: ref })));
});
export var InputAdornment = styled('div')(function (_a) {
    var theme = _a.theme;
    return "\n  margin: 8px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  grid-row: 1/3;\n  color: ".concat(theme.palette.mode === 'dark' ? grey[500] : grey[700], ";\n");
});
var blue = {
    100: '#DAECFF',
    200: '#B6DAFF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
    900: '#003A75',
};
var grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};
var InputRoot = styled('div')(function (_a) {
    var theme = _a.theme;
    return "\n  font-family: 'IBM Plex Sans', sans-serif;\n  font-weight: 400;\n  border-radius: 8px;\n  color: ".concat(theme.palette.mode === 'dark' ? grey[300] : grey[900], ";\n  background: ").concat(theme.palette.mode === 'dark' ? grey[900] : '#fff', ";\n  border: 1px solid ").concat(theme.palette.mode === 'dark' ? grey[700] : grey[200], ";\n  box-shadow: 0px 2px 4px ").concat(theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)', ";\n  display: grid;\n  grid-template-columns: auto 1fr auto 19px;\n  grid-template-rows: 1fr 1fr;\n  overflow: hidden;\n  padding: 4px;\n\n  &.").concat(numberInputClasses.focused, " {\n    border-color: ").concat(blue[400], ";\n    box-shadow: 0 0 0 3px ").concat(theme.palette.mode === 'dark' ? blue[700] : blue[200], ";\n  }\n\n  &:hover {\n    border-color: ").concat(blue[400], ";\n  }\n\n  // firefox\n  &:focus-visible {\n    outline: 0;\n  }\n");
});
var InputElement = styled('input')(function (_a) {
    var theme = _a.theme;
    return "\n  font-size: 0.875rem;\n  font-family: inherit;\n  font-weight: 400;\n  line-height: 1.5;\n  grid-row: 1/3;\n  color: ".concat(theme.palette.mode === 'dark' ? grey[300] : grey[900], ";\n  background: inherit;\n  border: none;\n  border-radius: inherit;\n  padding: 8px 12px;\n  outline: 0;\n");
});
var Button = styled('button')(function (_a) {
    var theme = _a.theme;
    return "\n  display: flex;\n  flex-flow: row nowrap;\n  justify-content: center;\n  align-items: center;\n  appearance: none;\n  padding: 0;\n  width: 19px;\n  height: 20px;\n  font-family: system-ui, sans-serif;\n  font-size: 0.875rem;\n  line-height: 1;\n  box-sizing: border-box;\n  background: ".concat(theme.palette.mode === 'dark' ? grey[900] : '#fff', ";\n  border: 0;\n  color: ").concat(theme.palette.mode === 'dark' ? grey[300] : grey[900], ";\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 120ms;\n\n  &:hover {\n    background: ").concat(theme.palette.mode === 'dark' ? grey[800] : grey[50], ";\n    border-color: ").concat(theme.palette.mode === 'dark' ? grey[600] : grey[300], ";\n    cursor: pointer;\n  }\n\n  &.").concat(numberInputClasses.incrementButton, " {\n    grid-column: 4/5;\n    grid-row: 1/2;\n    border-top-left-radius: 4px;\n    border-top-right-radius: 4px;\n    border: 1px solid;\n    border-bottom: 0;\n    border-color: ").concat(theme.palette.mode === 'dark' ? grey[700] : grey[200], ";\n    background: ").concat(theme.palette.mode === 'dark' ? grey[900] : grey[50], ";\n    color: ").concat(theme.palette.mode === 'dark' ? grey[200] : grey[900], ";\n\n    &:hover {\n      cursor: pointer;\n      color: #FFF;\n      background: ").concat(theme.palette.mode === 'dark' ? blue[600] : blue[500], ";\n      border-color: ").concat(theme.palette.mode === 'dark' ? blue[400] : blue[600], ";\n    }\n  }\n\n  &.").concat(numberInputClasses.decrementButton, " {\n    grid-column: 4/5;\n    grid-row: 2/3;\n    border-bottom-left-radius: 4px;\n    border-bottom-right-radius: 4px;\n    border: 1px solid;\n    border-color: ").concat(theme.palette.mode === 'dark' ? grey[700] : grey[200], ";\n    background: ").concat(theme.palette.mode === 'dark' ? grey[900] : grey[50], ";\n    color: ").concat(theme.palette.mode === 'dark' ? grey[200] : grey[900], ";\n\n    &:hover {\n      cursor: pointer;\n      color: #FFF;\n      background: ").concat(theme.palette.mode === 'dark' ? blue[600] : blue[500], ";\n      border-color: ").concat(theme.palette.mode === 'dark' ? blue[400] : blue[600], ";\n    }\n  }\n\n  & .arrow {\n    transform: translateY(-1px);\n  }\n\n  & .arrow {\n    transform: translateY(-1px);\n  }\n");
});
export default InputNumber;
//# sourceMappingURL=index.js.map