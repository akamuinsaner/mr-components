import { TableProps, TableContainerProps, TablePaginationProps, PopperProps } from '@mui/material';
import React from 'react';
import { RecordTableFilters, ReactTableFilterModes } from './Filter';
export type RecordTableSortDirections = 'asc' | 'desc';
export type RecordTableSortParams = {
    order: RecordTableSortDirections;
    orderBy: string;
};
export type RecordTableColumn<T> = {
    align?: 'left' | 'right' | 'center';
    className?: string;
    colSpan?: number;
    rowSpan?: number;
    dataIndex?: string | string[];
    key: string;
    render?: (value: any, record: T, index: number) => any;
    sortable?: boolean;
    title?: React.ReactNode;
    width?: number;
    onCell?: (record: T, index: number) => any;
    fixed?: 'left' | 'right';
    filters?: RecordTableFilters[];
    filterMode?: ReactTableFilterModes;
    children?: RecordTableColumn<T>[];
};
export type RecordTableExpandable<T> = {
    defaultExpandAllRows?: boolean;
    defaultExpandedRowKeys?: Array<string | number>;
    expandedRowClassName?: (record: T, index: number) => string;
    expandedRowKeys?: Array<string | number>;
    expandedRowRender?: (record: T, index: number, expanded: any) => React.ReactNode;
    expandRowByClick?: boolean;
    expandIcon?: (record: T, index: number, expanded: any) => React.ReactNode;
    onExpand?: (record: T) => void;
    onExpandedRowsChange?: (expandKeys: Array<string | number>, expandedRows: T[]) => void;
};
export type RecordTableRowSelection<T> = {
    columnTitle?: string | number | React.ReactNode;
    defaultSelectedRowKeys?: Array<string | number>;
    hideSelectAll?: boolean;
    onChange?: (selectedRowKeys: RecordTableRowSelection<T>['selectedRowKeys'], selectRows: T[]) => void;
    onSelect?: (record: T, selected: boolean) => void;
    selectedRowKeys?: Array<number | string>;
    type: 'checkbox' | 'radio';
};
export type RecordTableSortable<T> = {
    defaultSortParams?: RecordTableSortParams;
    sortParams?: RecordTableSortParams;
    sortIcon?: (column: RecordTableColumn<any>) => React.JSXElementConstructor<any>;
    onSortChange?: (sortParams: RecordTableSortParams) => void;
};
export type RecordTableDropable<T> = {
    dragStyle?: React.CSSProperties;
    lockAxis?: boolean;
    distance?: number;
    delay?: number;
    disabledRows?: (record: T, index: number) => boolean;
    disableStyle?: React.CSSProperties;
    onDropEnd?: (drag: {
        index: number;
        key: string | number;
        record: T;
    }, drop: {
        index: number;
        key: string | number;
        record: T;
    }) => void;
};
export type RecordTableFilterable<T> = {
    defaultFilterParams?: {
        [name: string]: Array<string | number>;
    };
    filterIcon?: (column: RecordTableColumn<T>, index: number) => React.JSXElementConstructor<any>;
    filterMode?: (column: RecordTableColumn<T>, index: number) => ReactTableFilterModes;
    filters?: (column: RecordTableColumn<T>, index: number) => RecordTableFilters[];
    filterParams?: {
        [name: string]: Array<string | number>;
    };
    onFilterChange?: (filterParams: {
        [name: string]: Array<string | number>;
    }) => void;
    popperProps?: Partial<PopperProps> | {
        (column: RecordTableColumn<T>, index: number): Partial<PopperProps>;
    };
};
export type RecordTableProps<T> = {
    bordered?: boolean;
    className?: TableProps['className'];
    columns: RecordTableColumn<T>[];
    component?: TableContainerProps['component'];
    dataSource: T[];
    dropable?: RecordTableDropable<T>;
    expandable?: RecordTableExpandable<T>;
    pagination?: TablePaginationProps | false;
    rowClassName?: string | {
        (record: T, index: number): string;
    };
    rowKey?: string | number | {
        (record: T): string | number;
    };
    rowSelection?: RecordTableRowSelection<T>;
    size?: TableProps['size'];
    sticky?: TableProps['stickyHeader'];
    scroll?: {
        x?: number;
        y?: number | 'auto';
    };
    sx?: TableProps['sx'];
    sortInfo?: RecordTableSortable<T>;
    filterInfo?: RecordTableFilterable<T>;
    onChange?: (pagination: any, filters: any, sorter: any, extra: {
        currentDataSource: T[];
        action: 'paginate' | 'sort' | 'filter';
    }) => void;
};
export declare const MRTableContext: React.Context<Partial<RecordTableProps<any>>>;
declare const RecordTable: <T extends object>({ bordered, className, columns, dataSource, component, expandable, pagination, rowClassName, rowKey, rowSelection, size, sticky, sortInfo, onChange, scroll, dropable, filterInfo, sx, }: RecordTableProps<T>) => import("react/jsx-runtime").JSX.Element;
export default RecordTable;
