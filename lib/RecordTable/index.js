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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, TableContainer, Table, } from '@mui/material';
import React from 'react';
import RecordTableHeader from './Header';
import RecordTableBody from './Body';
import RecordTableFooter from './Footer';
import { getRowKey, getDataDisplay, getContainerSizeByScroll, getRenderColumns, getDataColumns, } from './helper';
import classNames from 'classnames';
import styles from '../index.module.css';
export var MRTableContext = React.createContext(null);
var RecordTable = function (_a) {
    var _b, _c, _d;
    var bordered = _a.bordered, _e = _a.className, className = _e === void 0 ? '' : _e, columns = _a.columns, dataSource = _a.dataSource, _f = _a.component, component = _f === void 0 ? Box : _f, expandable = _a.expandable, pagination = _a.pagination, _g = _a.rowClassName, rowClassName = _g === void 0 ? '' : _g, rowKey = _a.rowKey, rowSelection = _a.rowSelection, _h = _a.size, size = _h === void 0 ? 'medium' : _h, _j = _a.sticky, sticky = _j === void 0 ? false : _j, sortInfo = _a.sortInfo, onChange = _a.onChange, scroll = _a.scroll, dropable = _a.dropable, filterInfo = _a.filterInfo, _k = _a.sx, sx = _k === void 0 ? {} : _k;
    var dataColumns = getDataColumns(columns);
    var renderColumns = getRenderColumns(columns);
    var _l = __read(React.useState([]), 2), displayData = _l[0], setDisplayData = _l[1];
    var getRowsFromKeys = function (keys) {
        return displayData.filter(function (d, index) { return keys.includes(getRowKey(d, rowKey, index)); });
    };
    /**********filter start**********/
    var _m = __read(React.useState(Object.assign({}, filterInfo === null || filterInfo === void 0 ? void 0 : filterInfo.defaultFilterParams)), 2), filterParams = _m[0], setFilterParams = _m[1];
    var onFilterChange = function (params) {
        onPaginationChange(0, pageParams.rowsPerPage);
        var newFilterParams = __assign(__assign({}, filterParams), params);
        if (!(filterInfo === null || filterInfo === void 0 ? void 0 : filterInfo.filterParams))
            setFilterParams(newFilterParams);
        if (filterInfo === null || filterInfo === void 0 ? void 0 : filterInfo.onFilterChange)
            filterInfo.onFilterChange(newFilterParams);
    };
    React.useEffect(function () {
        if (filterInfo === null || filterInfo === void 0 ? void 0 : filterInfo.filterParams)
            setFilterParams(filterInfo === null || filterInfo === void 0 ? void 0 : filterInfo.filterParams);
    }, [filterInfo === null || filterInfo === void 0 ? void 0 : filterInfo.filterParams]);
    /**********filter end**********/
    /********pagination start*******/
    var defaultPageParams = {
        count: dataSource.length,
        page: 0,
        rowsPerPage: pagination === false ? dataSource.length : 10,
    };
    var _o = __read(React.useState(Object.assign({}, defaultPageParams, pagination)), 2), pageParams = _o[0], setPageParams = _o[1];
    var onPaginationChange = function (page, rowsPerPage) {
        setPageParams(__assign(__assign({}, pageParams), { page: page, rowsPerPage: rowsPerPage }));
        onSelectAll([], []);
    };
    React.useEffect(function () {
        if (pagination) {
            var page = pagination.page, count = pagination.count, rowsPerPage = pagination.rowsPerPage;
            setPageParams(__assign(__assign({}, defaultPageParams), { page: page, count: count, rowsPerPage: rowsPerPage }));
        }
    }, [pagination]);
    /********pagination end*******/
    /******* sort start *******/
    var defaultSortParams = { orderBy: '', order: null };
    var _p = __read(React.useState(Object.assign({}, defaultSortParams, sortInfo === null || sortInfo === void 0 ? void 0 : sortInfo.defaultSortParams)), 2), sortParams = _p[0], setSortParams = _p[1];
    var onSortChange = function (orderBy, order) {
        var sortParams = { order: order, orderBy: orderBy };
        onPaginationChange(0, pageParams.rowsPerPage);
        onSelectAll([], []);
        if (!(sortInfo === null || sortInfo === void 0 ? void 0 : sortInfo.sortParams))
            setSortParams(sortParams);
        if (sortInfo === null || sortInfo === void 0 ? void 0 : sortInfo.onSortChange)
            sortInfo.onSortChange(sortParams);
    };
    React.useEffect(function () {
        if (sortInfo === null || sortInfo === void 0 ? void 0 : sortInfo.sortParams)
            setSortParams(sortInfo === null || sortInfo === void 0 ? void 0 : sortInfo.sortParams);
    }, [sortInfo === null || sortInfo === void 0 ? void 0 : sortInfo.sortParams]);
    /******* sort end *******/
    /********selection start*********/
    var _q = __read(React.useState((rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.defaultSelectedRowKeys) || []), 2), selectRowKeys = _q[0], setSelectRowKeys = _q[1];
    var onSelectChange = function (keys, index, select, row) {
        if (!(rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.selectedRowKeys))
            setSelectRowKeys(keys);
        if (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.onChange)
            rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.onChange(keys, getRowsFromKeys(keys));
        if ((rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.onSelect) && row)
            rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.onSelect(row, select);
    };
    var onSelectAll = function (keys, rows) {
        if (!(rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.selectedRowKeys))
            setSelectRowKeys(keys);
        if (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.onChange)
            rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.onChange(keys, rows);
    };
    React.useEffect(function () {
        if (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.selectedRowKeys)
            setSelectRowKeys(rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.selectedRowKeys);
    }, [rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.selectedRowKeys]);
    /********selection end*********/
    /*******expandable start*******/
    var getDefaultExpanedRowKeys = function () {
        if (expandable === null || expandable === void 0 ? void 0 : expandable.defaultExpandedRowKeys)
            return expandable === null || expandable === void 0 ? void 0 : expandable.defaultExpandedRowKeys;
        else if (expandable === null || expandable === void 0 ? void 0 : expandable.defaultExpandAllRows)
            return displayData.map(function (d, index) { return getRowKey(d, rowKey, index); });
        else
            return [];
    };
    var _r = __read(React.useState(getDefaultExpanedRowKeys()), 2), expandedRowKeys = _r[0], setExpandedRowKeys = _r[1];
    var onExpandChange = function (rowKey, expand, record) {
        var keys = [];
        if (expand)
            keys = __spreadArray(__spreadArray([], __read(expandedRowKeys), false), [rowKey], false);
        else
            keys = expandedRowKeys.filter(function (k) { return k !== rowKey; });
        if (expandable === null || expandable === void 0 ? void 0 : expandable.onExpandedRowsChange)
            expandable === null || expandable === void 0 ? void 0 : expandable.onExpandedRowsChange(keys, getRowsFromKeys(keys));
        if (!(expandable === null || expandable === void 0 ? void 0 : expandable.expandedRowKeys))
            setExpandedRowKeys(keys);
        if ((expandable === null || expandable === void 0 ? void 0 : expandable.onExpand) && expand)
            expandable === null || expandable === void 0 ? void 0 : expandable.onExpand(record);
    };
    React.useEffect(function () {
        if (expandable === null || expandable === void 0 ? void 0 : expandable.expandedRowKeys)
            setExpandedRowKeys(expandable === null || expandable === void 0 ? void 0 : expandable.expandedRowKeys);
    }, [expandable === null || expandable === void 0 ? void 0 : expandable.expandedRowKeys]);
    /*******expandable end*******/
    React.useEffect(function () {
        setDisplayData(getDataDisplay(dataSource, pagination, pageParams, sortParams, filterParams));
    }, [dataSource, pageParams, sortParams, filterParams, pagination]);
    if (scroll === null || scroll === void 0 ? void 0 : scroll.x) {
        sx = Object.assign({}, sx, { width: "".concat(scroll === null || scroll === void 0 ? void 0 : scroll.x, "px") });
    }
    var isSticky = sticky || !!(scroll === null || scroll === void 0 ? void 0 : scroll.y);
    return (_jsx(MRTableContext.Provider, __assign({ value: {
            expandable: expandable,
            rowSelection: rowSelection,
            sortInfo: sortInfo,
            filterInfo: filterInfo,
            dropable: dropable,
            rowClassName: rowClassName,
        } }, { children: _jsxs(Box, __assign({ className: classNames((_b = {},
                _b[styles["mr-table-wrpper"]] = true,
                _b[styles["mr-table-wrpper-scroll"]] = isSticky,
                _b)) }, { children: [_jsx(TableContainer, __assign({ component: component, className: classNames((_c = {},
                        _c[styles["mr-table-container"]] = true,
                        _c[styles["mr-table-container-scroll-x"]] = !!(scroll === null || scroll === void 0 ? void 0 : scroll.x),
                        _c[styles["mr-table-container-scroll-y"]] = isSticky,
                        _c)), sx: getContainerSizeByScroll(scroll) }, { children: _jsxs(Table, __assign({ size: size, stickyHeader: sticky || !!(scroll === null || scroll === void 0 ? void 0 : scroll.y), sx: sx, className: classNames(className, (_d = {},
                            _d[styles["mr-table"]] = true,
                            _d[styles["mr-table-bordered"]] = bordered,
                            _d[styles["mr-table-fixed"]] = !!(scroll === null || scroll === void 0 ? void 0 : scroll.x),
                            _d)) }, { children: [_jsx(RecordTableHeader, { columns: dataColumns, renderColumns: renderColumns, onSortChange: onSortChange, sortParams: sortParams, selectRowKeys: selectRowKeys, dataSource: displayData, pageParams: pageParams, onSelectAll: onSelectAll, rowKey: rowKey, isSticky: isSticky, onFilterChange: onFilterChange, filterParams: filterParams }), _jsx(RecordTableBody, { rowKey: rowKey, columns: dataColumns, dataSource: displayData, selectRowKeys: selectRowKeys, onSelectChange: onSelectChange, expandedRowKeys: expandedRowKeys, onExpandChange: onExpandChange, pageParams: pageParams })] })) })), _jsx(RecordTableFooter, { pageParams: pageParams, pagination: pagination, onPaginationChange: onPaginationChange })] })) })));
};
export default RecordTable;
//# sourceMappingURL=index.js.map