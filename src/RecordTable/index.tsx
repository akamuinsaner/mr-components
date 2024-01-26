import {
    Box,
    TableContainer,
    Table,
    TableProps,
    TableContainerProps,
    TablePaginationProps,
    PopperProps,
    CircularProgress,
    CircularProgressProps,
} from '@mui/material';
import React from 'react';
import RecordTableHeader from './Header';
import RecordTableBody from './Body';
import RecordTableFooter from './Footer';
import {
    getDataDisplay,
    getContainerSizeByScroll,
    getRenderColumns,
    getDataColumns,
} from './helper';
import classNames from 'classnames';
import styles from './index.module.css';
import {
    RecordTableFilters,
    ReactTableFilterModes
} from './Filter';
import useExpanded from './useExpanded';
import useSorted from './useSorted';
import useSelected from './useSelected';
import usePagination from './usePagination';
import useFiltered from './useFiltered';
import useScroll from './useScroll';

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
    noBorderRight?: boolean;
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
    fixed?: boolean;
    onExpand?: (record: T) => void;
    onExpandedRowsChange?: (expandKeys: Array<string | number>, expandedRows: T[]) => void;
}

export type RecordTableRowSelection<T> = {
    columnTitle?: string | number | React.ReactNode;
    defaultSelectedRowKeys?: Array<string | number>;
    fixed?: boolean;
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
    defaultFilterParams?: { [name: string]: Array<string | number> };
    filterIcon?: (column: RecordTableColumn<T>, index: number) => React.JSXElementConstructor<any>;
    filterMode?: (column: RecordTableColumn<T>, index: number) => ReactTableFilterModes;
    filters?: (column: RecordTableColumn<T>, index: number) => RecordTableFilters[];
    filterParams?: { [name: string]: Array<string | number> };
    onFilterChange?: (filterParams: { [name: string]: Array<string | number> }) => void;
    popperProps?: Partial<PopperProps> | { (column: RecordTableColumn<T>, index: number): Partial<PopperProps> };
}

export type RecordTableProps<T> = {
    bordered?: boolean;
    className?: TableProps['className'];
    columns: RecordTableColumn<T>[];
    component?: TableContainerProps['component'];
    dataSource: T[];
    dropable?: RecordTableDropable<T>;
    expandable?: RecordTableExpandable<T>;
    loading?: false | CircularProgressProps;
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
    loading,
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

    const { containerRef, scrollingInfo } = useScroll();

    const {
        selectRowKeys,
        onSelectAll,
        onSelectChange,
    } = useSelected<T>({ data: displayData, rowKey, rowSelection });

    const {
        pageParams,
        onPaginationChange,
        setPageParams,
    } = usePagination<T>({ dataSource, pagination, onSelectAll });

    const {
        filteredData,
        filterParams,
        onFilterChange
    } = useFiltered<T>({ dataSource, pageParams, filterInfo, setPageParams, onPaginationChange });


    const {
        sortParams,
        onSortChange,
    } = useSorted<T>({ sortInfo, pageParams, onPaginationChange });

    const {
        expandedRowKeys,
        onExpandChange,
    } = useExpanded<T>({ data: displayData, rowKey, expandable });


    React.useEffect(() => {
        const newData = getDataDisplay(filteredData, pagination, pageParams, sortParams);
        setDisplayData(newData);
    }, [filteredData, pageParams, sortParams, pagination]);

    if (scroll?.x) {
        sx = Object.assign({}, sx, { width: `${scroll?.x}px` });
    }
    const isSticky = sticky || !!scroll?.y;

    const tableWrapperClassName = classNames({
        [styles["mr-table-wrpper"]]: true,
        [styles["mr-table-wrpper-scroll"]]: isSticky,
    });

    const tableContainerClassName = classNames({
        [styles["mr-table-container"]]: true,
        [styles["mr-table-container-scroll-x"]]: !!scroll?.x,
        [styles["mr-table-container-scroll-y"]]: isSticky,
        [styles["mr-table-container-scroll-top"]]: !scrollingInfo.scrollTop
    });

    const tableClassName = classNames(className, {
        [styles["mr-table"]]: true,
        [styles["mr-table-bordered"]]: bordered,
        [styles["mr-table-fixed"]]: !!scroll?.x
    })

    const loadingClassName = classNames(styles["mr-table-loading-mask"], {
        [styles["hide"]]: !loading,
    });

    const contextValue = {
        expandable,
        rowSelection,
        sortInfo,
        filterInfo,
        dropable,
        scroll,
        rowClassName,  
    }

    return (
        <MRTableContext.Provider value={contextValue}>
            <Box className={tableWrapperClassName}>
                <TableContainer
                    ref={containerRef}
                    component={component}
                    className={tableContainerClassName}
                    sx={getContainerSizeByScroll(scroll)}
                >
                    <Table
                        size={size}
                        stickyHeader={sticky || !!scroll?.y}
                        sx={sx}
                        className={tableClassName}
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
                            scrollingInfo={scrollingInfo}
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
                            scrollingInfo={scrollingInfo}
                        />

                    </Table>
                </TableContainer>
                <RecordTableFooter
                    pageParams={pageParams}
                    pagination={pagination}
                    onPaginationChange={onPaginationChange}
                />
                <Box className={loadingClassName}>
                    <CircularProgress {...(loading || {})} />
                </Box>
            </Box>
        </MRTableContext.Provider>

    )
}

export default RecordTable;
