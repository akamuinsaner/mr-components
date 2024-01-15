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
    filterParams?: { [name: string]: Array<string | number>};
    onFilterChange?: (filterParams: { [name: string]: Array<string | number>}) => void;
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
    onFilterChange
}: RecordTableHeaderCellProps<T>) => {
    const defaultSortIcon = ArrowDownward;
    const context = React.useContext<Partial<RecordTableProps<T>>>(MRTableContext);
    const {
        expandable,
        rowSelection,
        sortInfo,
        filterInfo,
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
    const fixedStyle = getFixedStyle(fixed, columns, column.key);
    sx = Object.assign({}, fixedStyle, sx);
    return (
        <TableCell
            align={column.align}
            colSpan={column.colSpan}
            rowSpan={column.rowSpan}
            width={column.width}
            sortDirection={isSortable && isSorting ? sortDirection : false}
            sx={sx}
        >
            {
                isSortable ? (
                    <TableSortLabel
                        active={isSortable && isSorting}
                        direction={getDirection()}
                        IconComponent={getSortIcon()}
                        onClick={onSort}
                    >
                        {column.title}
                    </TableSortLabel>
                ) : column.title
            }
            <Filter
                column={column}
                index={index}
                onChange={(value) => onFilterChange({ [column.key]: value })}
                value={filterParams[column.key]}
            />
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
    filterParams?: { [name: string]: Array<string | number>};
    onFilterChange?: (filterParams: { [name: string]: Array<string | number>}) => void;
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
    onFilterChange
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
        const { columnTitle, type, hideSelectAll } = rowSelection;
        if (columnTitle) return (<TableCell>{columnTitle}</TableCell>);
        if (type === 'checkbox' && !hideSelectAll) return (
            <TableCell padding='checkbox' rowSpan={renderColumns.length}>
                <Checkbox
                    checked={dataSource.length === selectRowKeys.length}
                    indeterminate={selectRowKeys.length > 0 && selectRowKeys.length < dataSource.length}
                    onChange={onSelectAllChange}
                />
            </TableCell>
        )
        return <TableCell></TableCell>
    }

    const renderExpandHeaderCell = (depth) => {
        if (depth !== 0) return null;
        if (!expandable) return null;
        return (
            <TableCell rowSpan={renderColumns.length}></TableCell>
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
            [styles["mr-table-header-sticky"]]: isSticky
        })}>
            {renderheaderColumns()}
        </TableHead>
    )
}

export default RecordTableHeader;