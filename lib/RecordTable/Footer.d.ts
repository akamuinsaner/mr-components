import { TablePaginationProps } from '@mui/material';
export type RecordTablePaginationProps = {
    onPaginationChange: (page: number, rowsPerPage: number) => void;
    pageParams: Partial<TablePaginationProps>;
    pagination: Partial<TablePaginationProps> | false;
};
declare const RecordTablePagination: ({ onPaginationChange, pageParams, pagination }: RecordTablePaginationProps) => import("react/jsx-runtime").JSX.Element;
export default RecordTablePagination;
