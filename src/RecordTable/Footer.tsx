import { TablePaginationProps } from '@mui/material';
import {
    TableFooter,
    TablePagination
} from '@mui/material';
import styles from './index.module.css';

export type RecordTablePaginationProps = {
    onPaginationChange: (page: number, rowsPerPage: number) => void
    pageParams: Partial<TablePaginationProps>;
    pagination: Partial<TablePaginationProps> | false;
};

const RecordTablePagination = ({
    onPaginationChange,
    pageParams,
    pagination
}: RecordTablePaginationProps) => {
    if (pagination === false) return null;
    const onPageChange = (e, page) => {
        onPaginationChange(page, pageParams.rowsPerPage);
        if (pagination?.onPageChange) pagination?.onPageChange(e, page);
    }
    const onRowsPerPageChange = (e) => {
        onPaginationChange(pageParams.page, e.target.value);
        if (pagination?.onRowsPerPageChange) pagination?.onRowsPerPageChange(e);
    }
    return (
        <TablePagination
            page={pageParams.page}
            count={pageParams.count}
            rowsPerPage={pageParams.rowsPerPage}
            rowsPerPageOptions={[]}
            className={styles["mr-table-paganition"]}
            {...(pagination || {})}
            {...pageParams}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
        />

    )
}

export default RecordTablePagination;
