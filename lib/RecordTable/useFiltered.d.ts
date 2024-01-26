import { TablePaginationProps } from '@mui/material';
import { RecordTableFilterable } from './index';
type UseFilteredProps<T> = {
    dataSource: T[];
    pageParams: Partial<TablePaginationProps>;
    filterInfo: RecordTableFilterable<T>;
    setPageParams: (data: Partial<TablePaginationProps>) => void;
    onPaginationChange: (page: number, rowsPerPage: number) => void;
};
declare const _default: <T>({ dataSource, pageParams, filterInfo, setPageParams, onPaginationChange }: UseFilteredProps<T>) => {
    filteredData: T[];
    filterParams: {
        [name: string]: (string | number)[];
    };
    onFilterChange: (params: {
        [name: string]: (string | number)[];
    }) => void;
};
export default _default;
