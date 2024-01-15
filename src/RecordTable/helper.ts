import {
    RecordTableColumn,
    RecordTableProps,
    RecordTableSortParams,
} from '.';
import { TablePaginationProps } from '@mui/material';

const getCellValueByDataIndex = <T>(record: T, dataIndex: RecordTableColumn<T>['dataIndex']) => {
    let dataIndexList: string[];
    if (typeof dataIndex === 'string') {
        dataIndexList = dataIndex.split('.');
    } else {
        dataIndexList = dataIndex;
    }
    let result = record;
    for (let key of dataIndexList) {
        if (key in result) {
            result = record[key];
        } else {
            result = null;
            break;
        }
    }
    return result;
}

export const getCellData = <T>(column: RecordTableColumn<T>, record: T, index: number) => {
    let value: any = null;
    if (!!column.dataIndex) {
        value = getCellValueByDataIndex<T>(record, column.dataIndex);
    } else {
        value = record[column.key];
    }
    if (!!column.render) return column.render(value, record, index);
    return value;
}

export const getRowKey = <T>(record: T, rowKey: RecordTableProps<T>['rowKey'], index: number) => {
    return typeof rowKey === 'function' ? rowKey(record) : (rowKey ? record[rowKey] : index);
}

export const getRowClassName = <T>(record: T, rowClassName: RecordTableProps<T>['rowClassName'], index: number) => {
    return typeof rowClassName === 'function' ? rowClassName(record, index) : rowClassName;
}

export const getDataDisplay = (
    dataSource: any[],
    pagination: Partial<TablePaginationProps> | false,
    pageParams: Partial<TablePaginationProps>,
    sortParams: RecordTableSortParams,
    filterParams: { [name: string]: Array<string | number>}
) => {
    let data = [...dataSource];
    const { order, orderBy } = sortParams;
    let sorter = (a, b) => 0;
    if (order === 'asc' && orderBy) sorter = (a, b) => a[orderBy] > b[orderBy] ? 1 : -1;
    if (order === 'desc' && orderBy) sorter = (a, b) => a[orderBy] > b[orderBy] ? -1 : 1;
    data = data.sort(sorter);
    if (filterParams) {
        data = data.filter(d => {
            let success = true;
            for (let [key, values] of Object.entries(filterParams)) {
                const value = d[key];
                if (!values || !values.length) break;
                success = !!values.find(v => {
                    if (typeof v === 'string') {
                        return `${value}`.indexOf(v) > -1;
                    } else {
                        return v === value;
                    }
                })
                if (!success) break;
            }
            return success
        });
    }
    if (pagination === false || !!pagination) {
        data = data;
    } else {
        const { page, rowsPerPage } = pageParams;
        data = data.filter((d, i) => (i >= ((page) * rowsPerPage)) && (i < ((page + 1) * rowsPerPage)))
    }
    return data;
}

export const getContainerSizeByScroll = (scroll: { x?: number | 'auto', y?: number | 'auto' }) => {
    let width: any, height: any;
    if (!scroll) width = 'auto', height = 'auto';
    if (scroll?.y === 'auto') height = '100%';
    if (typeof scroll?.y === 'number') height = scroll?.y;
    return { width, height };
}

export const getFixedWidth = (columns: RecordTableColumn<any>[], key: any) => {
    const column = columns.find(item => item.key === key);
    if (!column || !column.fixed) return null;
    let fixDistance = 0;
    if (column.fixed === 'left') {
        for (let i = 0; i < columns.length; i++) {
            if (columns[i].key === key) break;
            if (!columns[i].width) return null;
            fixDistance += columns[i].width;
        }
    }
    if (column.fixed === 'right') {
        for (let i = columns.length - 1; i >= 0; i--) {
            if (columns[i].key === key) break;
            if (!columns[i].width) return null;
            fixDistance += columns[i].width;
        }
    }
    return fixDistance;
}

export const getFixedStyle = (fixed: 'left' | 'right', columns: RecordTableColumn<any>[], key: any) => {
    if (fixed && fixed === 'left') {
        return Object.assign({}, {
            left: getFixedWidth(columns, key),
            position: 'sticky',
            backgroundColor: '#fff',
            zIndex: 5,
        })
    }
    if (fixed && fixed === 'right') {
        return Object.assign({}, {
            right: getFixedWidth(columns, key),
            position: 'sticky',
            backgroundColor: '#fff',
            zIndex: 5,
        })
    }
    return {};
}

export const getDataColumns = (columns: RecordTableColumn<any>[], result = []): RecordTableColumn<any>[] => {
    columns.map(column => {
        if (column.children && column.children.length) {
            getDataColumns(column.children, result);
        } else {
            result.push(column);
        }
    })
    return result;
}

export const getRenderColumns = (columns: RecordTableColumn<any>[]): any => {
    let columnsList = [];
    const separateColumnsByLevel = (columns: RecordTableColumn<any>[]) => {
        let nextLevelColumns = [];
        columns.map(column => {
            if (column.children && column.children.length) nextLevelColumns = [...nextLevelColumns, ...column.children];
        })
        columnsList.push(columns);
        if (nextLevelColumns.length) {
            separateColumnsByLevel(nextLevelColumns);
        }
    }
    separateColumnsByLevel(columns);
    const getColSpanOfColumn = (list: RecordTableColumn<any>[], result = []) => {
        if (list && list.length) {
            list.map(column => {
                getColSpanOfColumn(column.children, result);
            })
        } else {
            result.push(1);
        }
        return result.length;
    }
    return columnsList.map((levelList, level) => {
        return levelList.map(column => {
            const hasChildren = column.children && column.children.length;
            return {
                ...column,
                rowSpan: hasChildren ? 1 : (columnsList.length - level),
                colSpan: getColSpanOfColumn(column.children)
            }
        })
    })
}