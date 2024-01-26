import { TablePaginationProps } from '@mui/material';
import React from 'react';
import {
    RecordTableSortParams,
    RecordTableSortDirections,
    RecordTableSortable
} from './index';

type UseSortedProps<T> = {
    sortInfo: RecordTableSortable<T>;
    pageParams: Partial<TablePaginationProps>;
    onPaginationChange: (page: number, rowsPerPage: number) => void;
}

export default <T>({
    pageParams,
    sortInfo,
    onPaginationChange
}: UseSortedProps<T>) => {
    const defaultSortParams: RecordTableSortParams = { orderBy: '', order: null };

    const [sortParams, setSortParams]
        = React.useState<RecordTableSortParams>(Object.assign({}, defaultSortParams, sortInfo?.defaultSortParams));

    const onSortChange = (orderBy: string, order: RecordTableSortDirections) => {
        const sortParams = { order, orderBy };
        onPaginationChange(0, pageParams.rowsPerPage);
        if (!sortInfo?.sortParams) {
            setSortParams(sortParams);
        }
        if (sortInfo?.onSortChange) {
            sortInfo.onSortChange(sortParams);
        }
    }

    React.useEffect(() => {
        if (sortInfo?.sortParams) setSortParams(sortInfo?.sortParams);
    }, [sortInfo?.sortParams]);

    return {
        sortParams,
        onSortChange
    }
}