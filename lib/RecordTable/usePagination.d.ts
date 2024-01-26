import { TablePaginationProps } from '@mui/material';
import React from 'react';
import { RecordTableProps } from './index';
type UsePaginationProps<T> = {
    dataSource: T[];
    pagination: RecordTableProps<T>["pagination"];
    onSelectAll: (keys: (string | number)[], rows: T[]) => void;
};
declare const _default: <T>({ dataSource, pagination, onSelectAll }: UsePaginationProps<T>) => {
    pageParams: Partial<TablePaginationProps<React.JSXElementConstructor<import("@mui/material").TablePaginationBaseProps>, {}>>;
    setPageParams: React.Dispatch<React.SetStateAction<Partial<TablePaginationProps<React.JSXElementConstructor<import("@mui/material").TablePaginationBaseProps>, {}>>>>;
    onPaginationChange: (page: number, rowsPerPage: number) => void;
};
export default _default;
