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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { TableHead, TableRow, TableCell, TableSortLabel, Checkbox } from '@mui/material';
import { ArrowDownward, } from '@mui/icons-material';
import { MRTableContext, } from '.';
import { getRowKey, getFixedStyle, } from './helper';
import classNames from 'classnames';
import styles from '../index.module.css';
import Filter from './Filter';
var RecordTableHeaderCell = function (_a) {
    var column = _a.column, isSorting = _a.isSorting, sortDirection = _a.sortDirection, onSortChange = _a.onSortChange, fixed = _a.fixed, columns = _a.columns, index = _a.index, filterParams = _a.filterParams, onFilterChange = _a.onFilterChange;
    var defaultSortIcon = ArrowDownward;
    var context = React.useContext(MRTableContext);
    var expandable = context.expandable, rowSelection = context.rowSelection, sortInfo = context.sortInfo, filterInfo = context.filterInfo;
    var isSortable = !!column.sortable;
    var getSortIcon = function () {
        if (sortInfo === null || sortInfo === void 0 ? void 0 : sortInfo.sortIcon) {
            return sortInfo === null || sortInfo === void 0 ? void 0 : sortInfo.sortIcon(column);
        }
        return defaultSortIcon;
    };
    var onSort = function () {
        var newColumnKey = column.key;
        var newSort = 'asc';
        if (isSorting) {
            if (sortDirection === 'asc') {
                newSort = 'desc';
            }
            else {
                newColumnKey = '';
            }
        }
        else {
            newSort = 'asc';
        }
        onSortChange(newColumnKey, newSort);
    };
    var getDirection = function () {
        if (isSorting)
            return sortDirection;
        return 'asc';
    };
    if (column.colSpan === 0)
        return;
    if (column.rowSpan === 0)
        return;
    var sx = {};
    var fixedStyle = getFixedStyle(fixed, columns, column.key);
    sx = Object.assign({}, fixedStyle, sx);
    return (_jsxs(TableCell, __assign({ align: column.align, colSpan: column.colSpan, rowSpan: column.rowSpan, width: column.width, sortDirection: isSortable && isSorting ? sortDirection : false, sx: sx }, { children: [isSortable ? (_jsx(TableSortLabel, __assign({ active: isSortable && isSorting, direction: getDirection(), IconComponent: getSortIcon(), onClick: onSort }, { children: column.title }))) : column.title, _jsx(Filter, { column: column, index: index, onChange: function (value) {
                    var _a;
                    return onFilterChange((_a = {}, _a[column.key] = value, _a));
                }, value: filterParams[column.key] })] })));
};
var RecordTableHeader = function (_a) {
    var _b;
    var sortParams = _a.sortParams, onSortChange = _a.onSortChange, selectRowKeys = _a.selectRowKeys, dataSource = _a.dataSource, onSelectAll = _a.onSelectAll, rowKey = _a.rowKey, isSticky = _a.isSticky, renderColumns = _a.renderColumns, filterParams = _a.filterParams, onFilterChange = _a.onFilterChange;
    var context = React.useContext(MRTableContext);
    var expandable = context.expandable, rowSelection = context.rowSelection;
    var renderHeaderCells = function (columns) {
        return columns.map(function (column, index) {
            var isSorting = sortParams.orderBy === column.key;
            var sortDirection = sortParams.order;
            return _jsx(RecordTableHeaderCell, { column: column, isSorting: isSorting, sortDirection: sortDirection, onSortChange: onSortChange, fixed: column.fixed, columns: columns, index: index, onFilterChange: onFilterChange, filterParams: filterParams }, column.key);
        });
    };
    var onSelectAllChange = function (e) {
        var checked = e.target.checked;
        if (checked) {
            onSelectAll(dataSource.map(function (d, i) { return getRowKey(d, rowKey, i); }), dataSource);
        }
        else {
            onSelectAll([], []);
        }
    };
    var renderSelectionHeaderCell = function (depth) {
        if (depth !== 0)
            return null;
        if (!rowSelection)
            return null;
        var columnTitle = rowSelection.columnTitle, type = rowSelection.type, hideSelectAll = rowSelection.hideSelectAll;
        if (columnTitle)
            return (_jsx(TableCell, { children: columnTitle }));
        if (type === 'checkbox' && !hideSelectAll)
            return (_jsx(TableCell, __assign({ padding: 'checkbox', rowSpan: renderColumns.length }, { children: _jsx(Checkbox, { checked: dataSource.length === selectRowKeys.length, indeterminate: selectRowKeys.length > 0 && selectRowKeys.length < dataSource.length, onChange: onSelectAllChange }) })));
        return _jsx(TableCell, {});
    };
    var renderExpandHeaderCell = function (depth) {
        if (depth !== 0)
            return null;
        if (!expandable)
            return null;
        return (_jsx(TableCell, { rowSpan: renderColumns.length }));
    };
    var renderheaderColumns = function () {
        return renderColumns.map(function (rc, depth) {
            return _jsxs(TableRow, { children: [renderExpandHeaderCell(depth), renderSelectionHeaderCell(depth), renderHeaderCells(rc)] }, depth);
        });
    };
    return (_jsx(TableHead, __assign({ className: classNames((_b = {},
            _b[styles["mr-table-header-sticky"]] = isSticky,
            _b)) }, { children: renderheaderColumns() })));
};
export default RecordTableHeader;
//# sourceMappingURL=Header.js.map