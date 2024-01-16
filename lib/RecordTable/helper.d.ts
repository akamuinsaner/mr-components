import { RecordTableColumn, RecordTableProps, RecordTableSortParams } from '.';
import { TablePaginationProps } from '@mui/material';
export declare const getCellData: <T>(column: RecordTableColumn<T>, record: T, index: number) => any;
export declare const getRowKey: <T>(record: T, rowKey: string | number | ((record: T) => string | number), index: number) => any;
export declare const getRowClassName: <T>(record: T, rowClassName: string | ((record: T, index: number) => string), index: number) => string;
export declare const getFilteredData: (dataSource: any[], filterParams: {
    [name: string]: (string | number)[];
}) => any[];
export declare const getDataDisplay: (dataSource: any[], pagination: Partial<TablePaginationProps> | false, pageParams: Partial<TablePaginationProps>, sortParams: RecordTableSortParams) => any[];
export declare const getContainerSizeByScroll: (scroll: {
    x?: number | 'auto';
    y?: number | 'auto';
}) => {
    width: any;
    height: any;
};
export declare const getFixedWidth: (columns: RecordTableColumn<any>[], key: any, expandFixed: boolean, selectFixed: boolean) => number;
export declare const getFixedStyle: (fixed: 'left' | 'right', columns: RecordTableColumn<any>[], key: any, expandFixed: boolean, selectFixed: boolean) => {};
export declare const getDataColumns: (columns: RecordTableColumn<any>[], result?: any[]) => RecordTableColumn<any>[];
export declare const getRenderColumns: (columns: RecordTableColumn<any>[]) => any;
