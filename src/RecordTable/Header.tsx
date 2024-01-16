import React from 'react';
import {
    TableHead,
    TableRow,
    TableCell,
    TableSortLabel,
    Checkbox
} from '@mui/material';
import {
    ArrowDownward, Colorize,
} from '@mui/icons-material';
import {
    RecordTableProps,
    RecordTableColumn,
    RecordTableSortDirections,
    RecordTableSortParams,
    MRTableContext,
} from '.';
import { TablePaginationProps } from '@mui/material';
import {
    getRowKey,
    getFixedStyle,
} from './helper';
import classNames from 'classnames';
import styles from '../index.module.css';
import Filter from './Filter';

export type RecordTableHeaderCellProps<T> = {
    column: RecordTableColumn<T>;
    isSorting: boolean;
    sortDirection: RecordTableSortDirections;
    onSortChange: (orderBy: string, order: RecordTableSortDirections) => void;
    fixed: 'left' | 'right';
    columns: RecordTableColumn<T>[];
    index: number;
    filterParams?: { [name: string]: Array<string | number> };
    onFilterChange?: (filterParams: { [name: string]: Array<string | number> }) => void;
    scrollingInfo: { scrollTop: boolean; scrollLeft: boolean; scrollRight: boolean; };
}

const RecordTableHeaderCell = <T,>({
    column,
    isSorting,
    sortDirection,
    onSortChange,
    fixed,
    columns,
    index,
    filterParams,
    onFilterChange,
    scrollingInfo
}: RecordTableHeaderCellProps<T>) => {
    const defaultSortIcon = ArrowDownward;
    const context = React.useContext<Partial<RecordTableProps<T>>>(MRTableContext);
    const {
        expandable,
        rowSelection,
        sortInfo,
        filterInfo,
        scroll
    } = context;
    const isSortable = !!column.sortable;

    const getSortIcon = () => {
        if (sortInfo?.sortIcon) {
            return sortInfo?.sortIcon(column);
        }
        return defaultSortIcon;
    }

    const onSort = () => {
        let newColumnKey = column.key;
        let newSort: RecordTableSortDirections = 'asc';
        if (isSorting) {
            if (sortDirection === 'asc') {
                newSort = 'desc';
            } else {
                newColumnKey = '';
            }
        } else {
            newSort = 'asc'
        }
        onSortChange(newColumnKey, newSort);
    }

    const getDirection = () => {
        if (isSorting) return sortDirection;
        return 'asc';
    }
    if (column.colSpan === 0) return;
    if (column.rowSpan === 0) return;
    let sx = {};
    const fixedStyle = scroll?.x ? getFixedStyle(
        fixed,
        columns,
        column.key,
        expandable?.fixed,
        rowSelection?.fixed
    ) : {};
    sx = Object.assign({}, fixedStyle, sx);
    let children: any = column.title;
    if (isSortable) {
        children = (<TableSortLabel
            active={isSortable && isSorting}
            direction={getDirection()}
            IconComponent={getSortIcon()}
            onClick={onSort}
        >
            {column.title}
        </TableSortLabel>)
    }
    const filters = filterInfo?.filters ? filterInfo?.filters(column, index) : column.filters
    if (filters) {
        children = (
            <Filter
                column={column}
                index={index}
                onChange={(value) => onFilterChange({ [column.key]: value })}
                value={filterParams[column.key]}
            >{children}
            </Filter>
        )
    }
    const showLeftFixShadow = !scrollingInfo.scrollLeft
        && column.fixed === 'left'
        && columns[index + 1]
        && columns[index + 1].fixed !== 'left';
    const showRightFixShadow = !scrollingInfo.scrollRight
        && column.fixed === 'right'
        && columns[index - 1]
        && columns[index - 1].fixed !== 'right';
    return (
        <TableCell
            align={column.align}
            colSpan={column.colSpan}
            rowSpan={column.rowSpan}
            width={column.width}
            sortDirection={isSortable && isSorting ? sortDirection : false}
            sx={sx}
            className={classNames({
                [styles["mr-table-header-no-border-right"]]: column.noBorderRight,
                [styles["mr-table-column-scroll-left"]]: showLeftFixShadow,
                [styles["mr-table-column-scroll-right"]]: showRightFixShadow,
            })}
        >
            {children}
        </TableCell>
    )
}



export type RecordTableHeaderProps<T> = Partial<RecordTableProps<T>> & {
    sortParams: RecordTableSortParams;
    onSortChange: (orderBy: string, order: RecordTableSortDirections) => void;
    selectRowKeys: Array<number | string>;
    pageParams: Partial<TablePaginationProps>;
    onSelectAll: (keys: Array<number | string>, rows: T[]) => void;
    isSticky: boolean;
    renderColumns: RecordTableColumn<T>[][];
    filterParams?: { [name: string]: Array<string | number> };
    onFilterChange?: (filterParams: { [name: string]: Array<string | number> }) => void;
    scrollingInfo: { scrollTop: boolean; scrollLeft: boolean; scrollRight: boolean; };
};

const RecordTableHeader = <T,>({
    sortParams,
    onSortChange,
    selectRowKeys,
    dataSource,
    onSelectAll,
    rowKey,
    isSticky,
    renderColumns,
    filterParams,
    onFilterChange,
    scrollingInfo,
}: RecordTableHeaderProps<T>) => {
    const context = React.useContext<Partial<RecordTableProps<T>>>(MRTableContext);
    const {
        expandable,
        rowSelection
    } = context;
    const renderHeaderCells = (columns) => {
        return columns.map((column, index) => {
            const isSorting = sortParams.orderBy === column.key;
            const sortDirection = sortParams.order;
            return <RecordTableHeaderCell<T>
                key={column.key}
                column={column}
                isSorting={isSorting}
                sortDirection={sortDirection}
                onSortChange={onSortChange}
                fixed={column.fixed}
                columns={columns}
                index={index}
                onFilterChange={onFilterChange}
                filterParams={filterParams}
                scrollingInfo={scrollingInfo}
            />
        })
    }
    const onSelectAllChange = (e: any) => {
        const checked = e.target.checked;
        if (checked) {
            onSelectAll(dataSource.map((d, i) => getRowKey(d, rowKey, i)), dataSource)
        } else {
            onSelectAll([], []);
        }
    }

    const renderSelectionHeaderCell = (depth) => {
        if (depth !== 0) return null;
        if (!rowSelection) return null;
        const { columnTitle, type = 'checkbox', hideSelectAll } = rowSelection;
        let sx = {};
        let className = classNames({
            [styles["mr-table-selection-fixed"]]: rowSelection?.fixed,
            [styles["mr-table-selection-fixed-after-expand"]]: expandable?.fixed
        })
        if (columnTitle) return (<TableCell
            sx={sx}
            className={className}
        >{columnTitle}</TableCell>);
        if (type === 'checkbox' && !hideSelectAll) return (
            <TableCell
                sx={sx}
                padding='checkbox'
                rowSpan={renderColumns.length}
                className={className}
            >
                <Checkbox
                    checked={dataSource.length === selectRowKeys.length}
                    indeterminate={selectRowKeys.length > 0 && selectRowKeys.length < dataSource.length}
                    onChange={onSelectAllChange}
                />
            </TableCell>
        )
        return <TableCell
            padding='checkbox'
            sx={sx}
            className={className}
            rowSpan={renderColumns.length}
        ></TableCell>
    }

    const renderExpandHeaderCell = (depth) => {
        if (depth !== 0) return null;
        if (!expandable) return null;
        let sx = {};
        let className = classNames({
            [styles["mr-table-expandable-fixed"]]: expandable?.fixed
        })
        return (
            <TableCell
                rowSpan={renderColumns.length}
                className={className}
                sx={sx}
            ></TableCell>
        )
    }

    const renderheaderColumns = () => {
        return renderColumns.map((rc, depth) => {
            return <TableRow key={depth}>
                {renderExpandHeaderCell(depth)}
                {renderSelectionHeaderCell(depth)}
                {renderHeaderCells(rc)}
            </TableRow>
        })
    }

    return (
        <TableHead className={classNames({
            [styles["mr-table-header-sticky"]]: isSticky,
        })}>
            {renderheaderColumns()}
        </TableHead>
    )
}

export default RecordTableHeader;