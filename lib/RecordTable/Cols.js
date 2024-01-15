import { jsx as _jsx } from "react/jsx-runtime";
export default (function (_a) {
    var columns = _a.columns;
    return (_jsx("colgroup", { children: columns.map(function (item) { return (_jsx("col", { width: item.width, style: { width: "".concat(item.width, "px") } })); }) }));
});
//# sourceMappingURL=Cols.js.map