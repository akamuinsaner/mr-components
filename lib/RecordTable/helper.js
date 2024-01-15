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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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
var getCellValueByDataIndex = function (record, dataIndex) {
    var e_1, _a;
    var dataIndexList;
    if (typeof dataIndex === 'string') {
        dataIndexList = dataIndex.split('.');
    }
    else {
        dataIndexList = dataIndex;
    }
    var result = record;
    try {
        for (var dataIndexList_1 = __values(dataIndexList), dataIndexList_1_1 = dataIndexList_1.next(); !dataIndexList_1_1.done; dataIndexList_1_1 = dataIndexList_1.next()) {
            var key = dataIndexList_1_1.value;
            if (key in result) {
                result = record[key];
            }
            else {
                result = null;
                break;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (dataIndexList_1_1 && !dataIndexList_1_1.done && (_a = dataIndexList_1.return)) _a.call(dataIndexList_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return result;
};
export var getCellData = function (column, record, index) {
    var value = null;
    if (!!column.dataIndex) {
        value = getCellValueByDataIndex(record, column.dataIndex);
    }
    else {
        value = record[column.key];
    }
    if (!!column.render)
        return column.render(value, record, index);
    return value;
};
export var getRowKey = function (record, rowKey, index) {
    return typeof rowKey === 'function' ? rowKey(record) : (rowKey ? record[rowKey] : index);
};
export var getRowClassName = function (record, rowClassName, index) {
    return typeof rowClassName === 'function' ? rowClassName(record, index) : rowClassName;
};
export var getDataDisplay = function (dataSource, pagination, pageParams, sortParams, filterParams) {
    var data = __spreadArray([], __read(dataSource), false);
    var order = sortParams.order, orderBy = sortParams.orderBy;
    var sorter = function (a, b) { return 0; };
    if (order === 'asc' && orderBy)
        sorter = function (a, b) { return a[orderBy] > b[orderBy] ? 1 : -1; };
    if (order === 'desc' && orderBy)
        sorter = function (a, b) { return a[orderBy] > b[orderBy] ? -1 : 1; };
    data = data.sort(sorter);
    if (filterParams) {
        data = data.filter(function (d) {
            var e_2, _a;
            var success = true;
            var _loop_1 = function (key, values) {
                var value = d[key];
                if (!values || !values.length)
                    return "break";
                success = !!values.find(function (v) {
                    if (typeof v === 'string') {
                        return "".concat(value).indexOf(v) > -1;
                    }
                    else {
                        return v === value;
                    }
                });
                if (!success)
                    return "break";
            };
            try {
                for (var _b = __values(Object.entries(filterParams)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), key = _d[0], values = _d[1];
                    var state_1 = _loop_1(key, values);
                    if (state_1 === "break")
                        break;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return success;
        });
    }
    if (pagination === false || !!pagination) {
        data = data;
    }
    else {
        var page_1 = pageParams.page, rowsPerPage_1 = pageParams.rowsPerPage;
        data = data.filter(function (d, i) { return (i >= ((page_1) * rowsPerPage_1)) && (i < ((page_1 + 1) * rowsPerPage_1)); });
    }
    return data;
};
export var getContainerSizeByScroll = function (scroll) {
    var width, height;
    if (!scroll)
        width = 'auto', height = 'auto';
    if ((scroll === null || scroll === void 0 ? void 0 : scroll.y) === 'auto')
        height = '100%';
    if (typeof (scroll === null || scroll === void 0 ? void 0 : scroll.y) === 'number')
        height = scroll === null || scroll === void 0 ? void 0 : scroll.y;
    return { width: width, height: height };
};
export var getFixedWidth = function (columns, key) {
    var column = columns.find(function (item) { return item.key === key; });
    if (!column || !column.fixed)
        return null;
    var fixDistance = 0;
    if (column.fixed === 'left') {
        for (var i = 0; i < columns.length; i++) {
            if (columns[i].key === key)
                break;
            if (!columns[i].width)
                return null;
            fixDistance += columns[i].width;
        }
    }
    if (column.fixed === 'right') {
        for (var i = columns.length - 1; i >= 0; i--) {
            if (columns[i].key === key)
                break;
            if (!columns[i].width)
                return null;
            fixDistance += columns[i].width;
        }
    }
    return fixDistance;
};
export var getFixedStyle = function (fixed, columns, key) {
    if (fixed && fixed === 'left') {
        return Object.assign({}, {
            left: getFixedWidth(columns, key),
            position: 'sticky',
            backgroundColor: '#fff',
            zIndex: 5,
        });
    }
    if (fixed && fixed === 'right') {
        return Object.assign({}, {
            right: getFixedWidth(columns, key),
            position: 'sticky',
            backgroundColor: '#fff',
            zIndex: 5,
        });
    }
    return {};
};
export var getDataColumns = function (columns, result) {
    if (result === void 0) { result = []; }
    columns.map(function (column) {
        if (column.children && column.children.length) {
            getDataColumns(column.children, result);
        }
        else {
            result.push(column);
        }
    });
    return result;
};
export var getRenderColumns = function (columns) {
    var columnsList = [];
    var separateColumnsByLevel = function (columns) {
        var nextLevelColumns = [];
        columns.map(function (column) {
            if (column.children && column.children.length)
                nextLevelColumns = __spreadArray(__spreadArray([], __read(nextLevelColumns), false), __read(column.children), false);
        });
        columnsList.push(columns);
        if (nextLevelColumns.length) {
            separateColumnsByLevel(nextLevelColumns);
        }
    };
    separateColumnsByLevel(columns);
    var getColSpanOfColumn = function (list, result) {
        if (result === void 0) { result = []; }
        if (list && list.length) {
            list.map(function (column) {
                getColSpanOfColumn(column.children, result);
            });
        }
        else {
            result.push(1);
        }
        return result.length;
    };
    return columnsList.map(function (levelList, level) {
        return levelList.map(function (column) {
            var hasChildren = column.children && column.children.length;
            return __assign(__assign({}, column), { rowSpan: hasChildren ? 1 : (columnsList.length - level), colSpan: getColSpanOfColumn(column.children) });
        });
    });
};
//# sourceMappingURL=helper.js.map