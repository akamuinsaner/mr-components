import {
    Box,
    TableContainer,
    Table,
    PaginationProps,
    TableProps,
    TableContainerProps,
    TablePaginationProps,
    PopperProps,
} from '@mui/material';
import React from 'react';
import RecordTableHeader from './Header';
import RecordTableBody from './Body';
import RecordTableFooter from './Footer';
import Cols from './Cols';
import {
    getRowKey,
    getDataDisplay,
    getContainerSizeByScroll,
    getRenderColumns,
    getDataColumns,
} from './helper';
import classNames from 'classnames';
import styles from '../index.module.css';
import {
    RecordTableFilters,
    ReactTableFilterModes
} from './Filter';

export type RecordTableSortDirections = 'asc' | 'desc';

export type RecordTableSortParams = {
    order: RecordTableSortDirections,
    orderBy: string;
}

export type RecordTableColumn<T> = {
    align?: 'left' | 'right' | 'center',
    className?: string;
    colSpan?: number;
    rowSpan?: number;
    dataIndex?: string | string[];
    key: string;
    render?: (value: any, record: T, index: number) => any;
    sortable?: boolean;
    title?: React.ReactNode;
    width?: number;
    onCell?: (record: T, index: number) => any;
    fixed?: 'left' | 'right';
    filters?: RecordTableFilters[];
    filterMode?: ReactTableFilterModes;
    children?: RecordTableColumn<T>[];
}

export type RecordTableExpandable<T> = {
    defaultExpandAllRows?: boolean;
    defaultExpandedRowKeys?: Array<string | number>;
    expandedRowClassName?: (record: T, index: number) => string;
    expandedRowKeys?: Array<string | number>;
    expandedRowRender?: (record: T, index: number, expanded) => React.ReactNode;
    expandRowByClick?: boolean;
    expandIcon?: (record: T, index: number, expanded) => React.ReactNode;
    onExpand?: (record: T) => void;
    onExpandedRowsChange?: (expandKeys: Array<string | number>, expandedRows: T[]) => void;
}

export type RecordTableRowSelection<T> = {
    columnTitle?: string | number | React.ReactNode;
    defaultSelectedRowKeys?: Array<string | number>;
    hideSelectAll?: boolean;
    onChange?: (selectedRowKeys: RecordTableRowSelection<T>['selectedRowKeys'], selectRows: T[]) => void;
    onSelect?: (record: T, selected: boolean) => void;
    selectedRowKeys?: Array<number | string>;
    type: 'checkbox' | 'radio';
}

export type RecordTableSortable<T> = {
    defaultSortParams?: RecordTableSortParams;
    sortParams?: RecordTableSortParams;
    sortIcon?: (column: RecordTableColumn<any>) => React.JSXElementConstructor<any>;
    onSortChange?: (sortParams: RecordTableSortParams) => void;
}

export type RecordTableDropable<T> = {
    dragStyle?: React.CSSProperties;
    lockAxis?: boolean;
    distance?: number;
    delay?: number;
    disabledRows?: (record: T, index: number) => boolean;
    disableStyle?: React.CSSProperties;
    onDropEnd?: (drag: { index: number; key: string | number; record: T },
        drop: { index: number; key: string | number; record: T }) => void;
}

export type RecordTableFilterable<T> = {
    defaultFilterParams?: { [name: string]: Array<string | number>};
    filterIcon?: (column: RecordTableColumn<T>, index: number) => React.JSXElementConstructor<any>;
    filterMode?: (column: RecordTableColumn<T>, index: number) => ReactTableFilterModes;
    filters?: (column: RecordTableColumn<T>, index: number) => RecordTableFilters[];
    filterParams?: { [name: string]: Array<string | number>};
    onFilterChange?: (filterParams: { [name: string]: Array<string | number>}) => void;
    popperProps?: Partial<PopperProps> | {(column: RecordTableColumn<T>, index: number): Partial<PopperProps>};
}

export type RecordTableProps<T> = {
    bordered?: boolean;
    className?: TableProps['className'];
    columns: RecordTableColumn<T>[];
    component?: TableContainerProps['component'];
    dataSource: T[];
    dropable?: RecordTableDropable<T>;
    expandable?: RecordTableExpandable<T>;
    pagination?: TablePaginationProps | false;
    rowClassName?: string | { (record: T, index: number): string };
    rowKey?: string | number | { (record: T): string | number };
    rowSelection?: RecordTableRowSelection<T>;
    size?: TableProps['size'];
    sticky?: TableProps['stickyHeader'];
    scroll?: { x?: number, y?: number | 'auto' };
    sx?: TableProps['sx'];
    sortInfo?: RecordTableSortable<T>;
    filterInfo?: RecordTableFilterable<T>;
    onChange?: (
        pagination,
        filters,
        sorter,
        extra: { currentDataSource: T[], action: 'paginate' | 'sort' | 'filter' }) => void;
}

export const MRTableContext = React.createContext<Partial<RecordTableProps<any>>>(null);

const RecordTable = <T extends object>({
    bordered,
    className = '',
    columns,
    dataSource,
    component = Box,
    expandable,
    pagination,
    rowClassName = '',
    rowKey,
    rowSelection,
    size = 'medium',
    sticky = false,
    sortInfo,
    onChange,
    scroll,
    dropable,
    filterInfo,
    sx = {},
}: RecordTableProps<T>) => {
    const dataColumns = getDataColumns(columns);
    const renderColumns = getRenderColumns(columns);
    const [displayData, setDisplayData] = React.useState<T[]>([]);

    const getRowsFromKeys = (keys) => {
        return displayData.filter((d, index) => keys.includes(getRowKey(d, rowKey, index)));
    }


    /**********filter start**********/
    const [filterParams, setFilterParams]
        = React.useState<{ [name: string]: Array<string | number>}>(Object.assign({}, filterInfo?.defaultFilterParams));
    const onFilterChange = (params: { [name: string]: Array<string | number>}) => {
        onPaginationChange(0, pageParams.rowsPerPage);
        const newFilterParams = { ...filterParams, ...params };
        if (!filterInfo?.filterParams) setFilterParams(newFilterParams);
        if (filterInfo?.onFilterChange) filterInfo.onFilterChange(newFilterParams);
    }
    React.useEffect(() => {
        if (filterInfo?.filterParams) setFilterParams(filterInfo?.filterParams);
    }, [filterInfo?.filterParams]);
    /**********filter end**********/

    /********pagination start*******/
    const defaultPageParams: Partial<TablePaginationProps> = {
        count: dataSource.length,
        page: 0,
        rowsPerPage: pagination === false ?  dataSource.length : 10,
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
    /********pagination end*******/

    /******* sort start *******/
    const defaultSortParams: RecordTableSortParams = { orderBy: '', order: null };
    const [sortParams, setSortParams]
        = React.useState<RecordTableSortParams>(Object.assign({}, defaultSortParams, sortInfo?.defaultSortParams));
    const onSortChange = (orderBy: string, order: RecordTableSortDirections) => {
        const sortParams = { order, orderBy };
        onPaginationChange(0, pageParams.rowsPerPage);
        onSelectAll([], []);
        if (!sortInfo?.sortParams) setSortParams(sortParams);
        if (sortInfo?.onSortChange) sortInfo.onSortChange(sortParams);
    }   
    React.useEffect(() => {
        if (sortInfo?.sortParams) setSortParams(sortInfo?.sortParams);
    }, [sortInfo?.sortParams]);
    /******* sort end *******/


    /********selection start*********/
    const [selectRowKeys, setSelectRowKeys]
        = React.useState<Array<number | string>>(rowSelection?.defaultSelectedRowKeys || []);

    const onSelectChange = (keys: Array<number | string>, index: number, select?: boolean, row?: T) => {
        if (!rowSelection?.selectedRowKeys) setSelectRowKeys(keys);
        if (rowSelection?.onChange) rowSelection?.onChange(keys, getRowsFromKeys(keys));
        if (rowSelection?.onSelect && row) rowSelection?.onSelect(row, select);
    }

    const onSelectAll = (keys: Array<number | string>, rows: T[]) => {
        if (!rowSelection?.selectedRowKeys) setSelectRowKeys(keys);
        if (rowSelection?.onChange) rowSelection?.onChange(keys, rows);
    }

    React.useEffect(() => {
        if (rowSelection?.selectedRowKeys) setSelectRowKeys(rowSelection?.selectedRowKeys);
    }, [rowSelection?.selectedRowKeys]);
    /********selection end*********/



    /*******expandable start*******/
    const getDefaultExpanedRowKeys = () => {
        if (expandable?.defaultExpandedRowKeys) return expandable?.defaultExpandedRowKeys;
        else if (expandable?.defaultExpandAllRows) return displayData.map((d, index) => getRowKey(d, rowKey, index));
        else return [];
    }
    const [expandedRowKeys, setExpandedRowKeys]
        = React.useState<Array<number | string>>(getDefaultExpanedRowKeys());

    const onExpandChange = (rowKey, expand, record) => {
        let keys = [];
        if (expand) keys = [...expandedRowKeys, rowKey];
        else keys = expandedRowKeys.filter(k => k !== rowKey);
        if (expandable?.onExpandedRowsChange) expandable?.onExpandedRowsChange(keys, getRowsFromKeys(keys));
        if (!expandable?.expandedRowKeys) setExpandedRowKeys(keys);
        if (expandable?.onExpand && expand) expandable?.onExpand(record);
    }

    React.useEffect(() => {
        if (expandable?.expandedRowKeys) setExpandedRowKeys(expandable?.expandedRowKeys);
    }, [expandable?.expandedRowKeys]);
    /*******expandable end*******/

    React.useEffect(() => {
        setDisplayData(getDataDisplay(dataSource, pagination, pageParams, sortParams, filterParams))
    }, [dataSource, pageParams, sortParams, filterParams, pagination]);

    if (scroll?.x) {
        sx = Object.assign({}, sx, { width: `${scroll?.x}px` });
    }
    const isSticky = sticky || !!scroll?.y;
    return (
        <MRTableContext.Provider value={{
            expandable,
            rowSelection,
            sortInfo,
            filterInfo,
            dropable,
            rowClassName,
        }}>
            <Box className={classNames({
                [styles["mr-table-wrpper"]]: true,
                [styles["mr-table-wrpper-scroll"]]: isSticky,
            })}>
                <TableContainer
                    component={component}
                    className={classNames({
                        [styles["mr-table-container"]]: true,
                        [styles["mr-table-container-scroll-x"]]: !!scroll?.x,
                        [styles["mr-table-container-scroll-y"]]: isSticky,
                    })}
                    sx={getContainerSizeByScroll(scroll)}
                >
                    <Table
                        size={size}
                        stickyHeader={sticky || !!scroll?.y}
                        sx={sx}
                        className={classNames(className, {
                            [styles["mr-table"]]: true,
                            [styles["mr-table-bordered"]]: bordered,
                            [styles["mr-table-fixed"]]: !!scroll?.x
                        })}
                    >
                        <RecordTableHeader<T>
                            columns={dataColumns}
                            renderColumns={renderColumns}
                            onSortChange={onSortChange}
                            sortParams={sortParams}
                            selectRowKeys={selectRowKeys}
                            dataSource={displayData}
                            pageParams={pageParams}
                            onSelectAll={onSelectAll}
                            rowKey={rowKey}
                            isSticky={isSticky}
                            onFilterChange={onFilterChange}
                            filterParams={filterParams}
                        />
                        <RecordTableBody<T>
                            rowKey={rowKey}
                            columns={dataColumns}
                            dataSource={displayData}
                            selectRowKeys={selectRowKeys}
                            onSelectChange={onSelectChange}
                            expandedRowKeys={expandedRowKeys}
                            onExpandChange={onExpandChange}
                            pageParams={pageParams}
                        />

                    </Table>
                </TableContainer>
                <RecordTableFooter
                    pageParams={pageParams}
                    pagination={pagination}
                    onPaginationChange={onPaginationChange}
                />
            </Box>
        </MRTableContext.Provider>

    )
}

export default RecordTable;
