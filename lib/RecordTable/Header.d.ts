import { RecordTableProps, RecordTableColumn, RecordTableSortDirections, RecordTableSortParams } from '.';
import { TablePaginationProps } from '@mui/material';
export type RecordTableHeaderCellProps<T> = {
    column: RecordTableColumn<T>;
    isSorting: boolean;
    sortDirection: RecordTableSortDirections;
    onSortChange: (orderBy: string, order: RecordTableSortDirections) => void;
    fixed: 'left' | 'right';
    columns: RecordTableColumn<T>[];
    index: number;
    filterParams?: {
        [name: string]: Array<string | number>;
    };
    onFilterChange?: (filterParams: {
        [name: string]: Array<string | number>;
    }) => void;
    scrollingInfo: {
        scrollTop: boolean;
        scrollLeft: boolean;
        scrollRight: boolean;
    };
};
export type RecordTableHeaderProps<T> = Partial<RecordTableProps<T>> & {
    sortParams: RecordTableSortParams;
    onSortChange: (orderBy: string, order: RecordTableSortDirections) => void;
    selectRowKeys: Array<number | string>;
    pageParams: Partial<TablePaginationProps>;
    onSelectAll: (keys: Array<number | string>, rows: T[]) => void;
    isSticky: boolean;
    renderColumns: RecordTableColumn<T>[][];
    filterParams?: {
        [name: string]: Array<string | number>;
    };
    onFilterChange?: (filterParams: {
        [name: string]: Array<string | number>;
    }) => void;
    scrollingInfo: {
        scrollTop: boolean;
        scrollLeft: boolean;
        scrollRight: boolean;
    };
};
declare const RecordTableHeader: <T>({ sortParams, onSortChange, selectRowKeys, dataSource, onSelectAll, rowKey, isSticky, renderColumns, filterParams, onFilterChange, scrollingInfo, }: RecordTableHeaderProps<T>) => import("react/jsx-runtime").JSX.Element;
export default RecordTableHeader;
