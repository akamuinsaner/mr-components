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
import { TablePagination } from '@mui/material';
import styles from '../index.module.css';
var RecordTablePagination = function (_a) {
    var onPaginationChange = _a.onPaginationChange, pageParams = _a.pageParams, pagination = _a.pagination;
    if (pagination === false)
        return null;
    var onPageChange = function (e, page) {
        onPaginationChange(page, pageParams.rowsPerPage);
        if (pagination === null || pagination === void 0 ? void 0 : pagination.onPageChange)
            pagination === null || pagination === void 0 ? void 0 : pagination.onPageChange(e, page);
    };
    var onRowsPerPageChange = function (e) {
        onPaginationChange(pageParams.page, e.target.value);
        if (pagination === null || pagination === void 0 ? void 0 : pagination.onRowsPerPageChange)
            pagination === null || pagination === void 0 ? void 0 : pagination.onRowsPerPageChange(e);
    };
    return (_jsx(TablePagination, __assign({ page: pageParams.page, count: pageParams.count, rowsPerPage: pageParams.rowsPerPage, rowsPerPageOptions: [], className: styles["mr-table-paganition"] }, (pagination || {}), pageParams, { onPageChange: onPageChange, onRowsPerPageChange: onRowsPerPageChange })));
};
export default RecordTablePagination;
//# sourceMappingURL=Footer.js.map