import { TablePaginationProps } from '@mui/material';
import { RecordTableSortParams, RecordTableSortDirections, RecordTableSortable } from './index';
type UseSortedProps<T> = {
    sortInfo: RecordTableSortable<T>;
    pageParams: Partial<TablePaginationProps>;
    onPaginationChange: (page: number, rowsPerPage: number) => void;
};
declare const _default: <T>({ pageParams, sortInfo, onPaginationChange }: UseSortedProps<T>) => {
    sortParams: RecordTableSortParams;
    onSortChange: (orderBy: string, order: RecordTableSortDirections) => void;
};
export default _default;
