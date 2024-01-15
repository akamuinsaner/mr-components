import { TablePaginationProps } from '@mui/material';
import { RecordTableProps } from '.';
type RecordTableBodyProps<T> = Partial<RecordTableProps<T>> & {
    selectRowKeys: Array<string | number>;
    onSelectChange: (keys: Array<number | string>, index: number, select?: boolean, row?: T) => void;
    expandedRowKeys: Array<string | number>;
    onExpandChange: (key: number | string, expand: boolean, record: T) => void;
    pageParams: Partial<TablePaginationProps>;
};
declare const RecordTableBody: <T>({ rowKey, columns, dataSource, selectRowKeys, onSelectChange, expandedRowKeys, onExpandChange, pageParams, }: RecordTableBodyProps<T>) => import("react/jsx-runtime").JSX.Element;
export default RecordTableBody;
