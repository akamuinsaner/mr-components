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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { TableBody, TableRow, TableCell, Checkbox, Radio, IconButton } from '@mui/material';
import { MRTableContext } from '.';
import { getCellData, getRowKey, getRowClassName, getFixedStyle, } from './helper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, } from '@dnd-kit/sortable';
import { restrictToVerticalAxis, } from '@dnd-kit/modifiers';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
var RecordTableBodyCell = function (_a) {
    var data = _a.data, align = _a.align, onCell = _a.onCell, width = _a.width, columns = _a.columns, columnKey = _a.columnKey, fixed = _a.fixed;
    var colSpan = onCell === null || onCell === void 0 ? void 0 : onCell.colSpan;
    var rowSpan = onCell === null || onCell === void 0 ? void 0 : onCell.rowSpan;
    if (colSpan === 0 || rowSpan === 0)
        return;
    var sx = (onCell === null || onCell === void 0 ? void 0 : onCell.sx) || {};
    var fixedStyle = getFixedStyle(fixed, columns, columnKey);
    sx = Object.assign({}, fixedStyle, sx);
    return (_jsx(TableCell, __assign({ align: align, colSpan: colSpan, rowSpan: rowSpan, width: width, sx: sx }, { children: data })));
};
var RecordTableRow = function (_a) {
    var record = _a.record, columns = _a.columns, index = _a.index, rowKey = _a.rowKey, selectRowKeys = _a.selectRowKeys, onSelectChange = _a.onSelectChange, expanded = _a.expanded, onExpandChange = _a.onExpandChange;
    var context = React.useContext(MRTableContext);
    var expandable = context.expandable, rowSelection = context.rowSelection, rowClassName = context.rowClassName, dropable = context.dropable;
    var onCheckBoxChange = function (e) {
        var checked = e.target.checked;
        if (checked) {
            onSelectChange(Array.from(new Set(__spreadArray(__spreadArray([], __read(selectRowKeys), false), [rowKey], false))), index, true, record);
        }
        else {
            onSelectChange(selectRowKeys.filter(function (k) { return k !== rowKey; }), index, false, record);
        }
    };
    var onRadioChange = function (e) {
        var checked = e.target.checked;
        if (checked) {
            onSelectChange([rowKey], index, true, record);
        }
        else {
            onSelectChange([], index, false, record);
        }
    };
    var renderTableCells = function () {
        return columns.map(function (column) {
            return (_jsx(RecordTableBodyCell, { columnKey: column.key, width: column.width, align: column.align, data: getCellData(column, record, index), onCell: column.onCell && column.onCell(record, index), columns: columns, fixed: column.fixed }, column.key));
        });
    };
    var renderSelectionCell = function () {
        if (!rowSelection)
            return null;
        if (rowSelection.type === 'radio') {
            return _jsx(TableCell, __assign({ padding: 'checkbox' }, { children: _jsx(Radio, { checked: selectRowKeys[0] === rowKey, onChange: onRadioChange }) }));
        }
        else {
            return _jsx(TableCell, __assign({ padding: 'checkbox' }, { children: _jsx(Checkbox, { checked: selectRowKeys.includes(rowKey), onChange: onCheckBoxChange }) }));
        }
    };
    var defaultExpandIcon = expanded
        ? _jsx(KeyboardArrowUpIcon, {})
        : _jsx(KeyboardArrowDownIcon, {});
    var renderExpandCell = function () {
        if (!expandable)
            return null;
        return _jsx(TableCell, __assign({ padding: 'checkbox' }, { children: _jsx(IconButton, __assign({ size: "small", onClick: function (e) {
                    e.stopPropagation();
                    onExpandChange(rowKey, !expanded, record);
                } }, { children: (expandable === null || expandable === void 0 ? void 0 : expandable.expandIcon)
                    ? expandable === null || expandable === void 0 ? void 0 : expandable.expandIcon(record, index, expanded)
                    : defaultExpandIcon })) }));
    };
    var renderExpandContent = function () {
        if (!expanded || !expandable)
            return null;
        var colSpan = columns.length + 1;
        if (rowSelection)
            colSpan += 1;
        var rowClassName = expandable === null || expandable === void 0 ? void 0 : expandable.expandedRowClassName(record, index);
        var rowRender = expandable === null || expandable === void 0 ? void 0 : expandable.expandedRowRender(record, index, expanded);
        return _jsx(TableRow, __assign({ className: rowClassName }, { children: _jsx(TableCell, __assign({ colSpan: colSpan }, { children: rowRender })) }));
    };
    var onRowClick = function (e) {
        e.stopPropagation();
        if (expandable === null || expandable === void 0 ? void 0 : expandable.expandRowByClick) {
            onExpandChange(rowKey, !expanded, record);
        }
    };
    if (dropable) {
        var disabled = dropable.disabledRows ? dropable.disabledRows(record, index) : false;
        var _b = useSortable({
            id: rowKey,
            disabled: disabled,
        }), attributes = _b.attributes, listeners = _b.listeners, setNodeRef = _b.setNodeRef, transform = _b.transform, transition = _b.transition, isDragging = _b.isDragging;
        var style = {
            transform: CSS.Transform.toString(transform),
            transition: transition,
            cursor: 'grab'
        };
        var draggingStyles = {
            background: '#fff',
            boxShadow: '8px 5px 10px rgba(0, 0, 0, 0.3)',
            userSelect: 'none'
        };
        var disableStyles = {
            cursor: 'not-allowed',
            background: '#eee',
            '& .MuiTableCell-root': {
                color: '#aaa',
            }
        };
        if (isDragging) {
            style = Object.assign({}, style, draggingStyles, dropable.dragStyle);
        }
        if (disabled) {
            style = Object.assign({}, style, disableStyles, dropable.disableStyle);
        }
        return (_jsxs(_Fragment, { children: [_jsxs(TableRow, __assign({ hover: true, tabIndex: -1, className: getRowClassName(record, rowClassName, index), onClick: onRowClick, ref: setNodeRef, sx: style }, listeners, attributes, { children: [renderExpandCell(), renderSelectionCell(), renderTableCells()] }), rowKey), renderExpandContent()] }));
    }
    return (_jsxs(_Fragment, { children: [_jsxs(TableRow, __assign({ hover: true, tabIndex: -1, className: getRowClassName(record, rowClassName, index), onClick: onRowClick }, { children: [renderExpandCell(), renderSelectionCell(), renderTableCells()] }), rowKey), renderExpandContent()] }));
};
var RecordTableBody = function (_a) {
    var rowKey = _a.rowKey, columns = _a.columns, dataSource = _a.dataSource, selectRowKeys = _a.selectRowKeys, onSelectChange = _a.onSelectChange, expandedRowKeys = _a.expandedRowKeys, onExpandChange = _a.onExpandChange, pageParams = _a.pageParams;
    var context = React.useContext(MRTableContext);
    var dropable = context.dropable;
    var renderTableRows = function () {
        return dataSource.map(function (record, index) {
            var finalRowKey = getRowKey(record, rowKey, index);
            var expanded = expandedRowKeys.includes(finalRowKey);
            return (_jsx(RecordTableRow, { columns: columns, record: record, index: index, rowKey: finalRowKey, selectRowKeys: selectRowKeys, onSelectChange: onSelectChange, expanded: expanded, onExpandChange: onExpandChange }, finalRowKey));
        });
    };
    if (dropable) {
        var sensors = useSensors(useSensor(PointerSensor, {
            activationConstraint: {
                delay: dropable.delay || 0,
                distance: dropable.distance || 0,
            }
        }), useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }));
        var modifiers = [];
        if (dropable === null || dropable === void 0 ? void 0 : dropable.lockAxis) {
            modifiers.push(restrictToVerticalAxis);
        }
        var handleDragEnd = function (e) {
            var active = e.active, over = e.over;
            var dragKey = active.id;
            var dropKey = over.id;
            var dragRow = dataSource.find(function (d, i) { return getRowKey(d, rowKey, i) === dragKey; });
            var dropRow = dataSource.find(function (d, i) { return getRowKey(d, rowKey, i) === dropKey; });
            var dragIndex = dataSource.findIndex(function (d, i) { return getRowKey(d, rowKey, i) === dragKey; });
            var dropIndex = dataSource.findIndex(function (d, i) { return getRowKey(d, rowKey, i) === dropKey; });
            dropable === null || dropable === void 0 ? void 0 : dropable.onDropEnd({
                key: dragKey,
                index: dragIndex + pageParams.page * pageParams.rowsPerPage,
                record: dragRow
            }, {
                key: dropKey,
                index: dropIndex + pageParams.page * pageParams.rowsPerPage,
                record: dropRow
            });
        };
        return (_jsx(TableBody, { children: _jsx(DndContext, __assign({ sensors: sensors, collisionDetection: closestCenter, onDragEnd: handleDragEnd, modifiers: modifiers }, { children: _jsx(SortableContext, __assign({ items: dataSource.map(function (r, i) { return getRowKey(r, rowKey, i); }), strategy: verticalListSortingStrategy }, { children: renderTableRows() })) })) }));
    }
    return (_jsx(TableBody, { children: renderTableRows() }));
};
export default RecordTableBody;
//# sourceMappingURL=Body.js.map