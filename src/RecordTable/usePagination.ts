import { TablePaginationProps } from '@mui/material';
import React from 'react';
import {
    RecordTableProps
} from './index';

type UsePaginationProps<T> = {
    dataSource: T[];
    pagination: RecordTableProps<T>["pagination"];
    onSelectAll: (keys: (string | number)[], rows: T[]) => void;
}

export default <T>({
    dataSource,
    pagination,
    onSelectAll
}: UsePaginationProps<T>) => {
    const defaultPageParams: Partial<TablePaginationProps> = {
        count: dataSource.length,
        page: 0,
        rowsPerPage: pagination === false ? dataSource.length : 10,
    }
    const [pageParams, setPageParams]
        = React.useState<Partial<TablePaginationProps>>(Object.assign({}, defaultPageParams, pagination));
    const onPaginationChange = (page: number, rowsPerPage: number) => {
        setPageParams({ ...pageParams, page, rowsPerPage });
        onSelectAll([], []);
    }
    React.useEffect(() => {
        if (pagination) {
            const { page, count, rowsPerPage } = pagination;
            setPageParams({ ...defaultPageParams, page, count, rowsPerPage });
        }
    }, [pagination]);

    return {
        pageParams,
        setPageParams,
        onPaginationChange
    }
}