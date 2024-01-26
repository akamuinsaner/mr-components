import { TablePaginationProps } from '@mui/material';
import React from 'react';
import {
    RecordTableFilterable
} from './index';
import {
    getFilteredData,
} from './helper';

type UseFilteredProps<T> = {
    dataSource: T[];
    pageParams: Partial<TablePaginationProps>;
    filterInfo: RecordTableFilterable<T>;
    setPageParams: (data: Partial<TablePaginationProps>) => void;
    onPaginationChange: (page: number, rowsPerPage: number) => void;
}

export default <T>({
    dataSource,
    pageParams,
    filterInfo,
    setPageParams,
    onPaginationChange
}: UseFilteredProps<T>) => {
    const [filteredData, setFilteredData] = React.useState<T[]>([]);
    const [filterParams, setFilterParams]
        = React.useState<{ [name: string]: Array<string | number> }>(Object.assign({}, filterInfo?.defaultFilterParams));

    const onFilterChange = (params: { [name: string]: Array<string | number> }) => {
        onPaginationChange(0, pageParams.rowsPerPage);
        const newFilterParams = {
            ...filterParams,
            ...params
        };
        if (!filterInfo?.filterParams) {
            setFilterParams(newFilterParams);
        }
        if (filterInfo?.onFilterChange) {
            filterInfo.onFilterChange(newFilterParams);
        }
    }
    React.useEffect(() => {
        if (filterInfo?.filterParams) {
            setFilterParams(filterInfo?.filterParams);
        }
    }, [filterInfo?.filterParams]);

    React.useEffect(() => {
        const filteredData = getFilteredData(dataSource, filterParams);
        setFilteredData(filteredData);
        setPageParams({ ...pageParams, page: 0, count: filteredData.length });
    }, [dataSource, filterParams]);

    return {
        filteredData,
        filterParams,
        onFilterChange
    }
}