import React from 'react';
import {
    TableBody,
    TableRow,
    TableCell,
    Checkbox,
    Radio,
    IconButton,
    TablePaginationProps
} from '@mui/material';
import {
    RecordTableProps,
    RecordTableColumn,
    MRTableContext
} from '.';
import {
    getCellData,
    getRowKey,
    getRowClassName,
    getFixedWidth,
    getFixedStyle,
} from './helper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
    DndContext,
    DragOverlay,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
    restrictToVerticalAxis,
    restrictToWindowEdges,
} from '@dnd-kit/modifiers';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styles from '../index.module.css'

import classNames from 'classnames';

type RecordTableCellProps<T> = {
    data: any;
    align: 'left' | 'right' | 'center';
    onCell: any;
    width: number;
    columns: RecordTableColumn<T>[];
    column: RecordTableColumn<T>;
    columnKey: any;
    fixed: 'left' | 'right';
    scrollingInfo: { scrollTop: boolean; scrollLeft: boolean; scrollRight: boolean; };
    columnIndex: number;
}

const RecordTableBodyCell = <T,>({
    data,
    align,
    onCell,
    width,
    columns,
    column,
    columnKey,
    fixed,
    scrollingInfo,
    columnIndex
}: RecordTableCellProps<T>) => {
    const colSpan = onCell?.colSpan;
    const rowSpan = onCell?.rowSpan;
    const context = React.useContext<Partial<RecordTableProps<T>>>(MRTableContext);
    const {
        expandable,
        rowSelection,
        scroll
    } = context;
    if (colSpan === 0 || rowSpan === 0) return;
    let sx = onCell?.sx || {};
    const fixedStyle = scroll?.x ? getFixedStyle(
        fixed,
        columns,
        columnKey,
        expandable?.fixed,
        rowSelection?.fixed
    ) : {};
    sx = Object.assign({}, fixedStyle, sx);
    const showLeftFixShadow = !scrollingInfo.scrollLeft
        && column.fixed === 'left'
        && columns[columnIndex + 1]
        && columns[columnIndex + 1].fixed !== 'left';
    const showRightFixShadow = !scrollingInfo.scrollRight
        && column.fixed === 'right'
        && columns[columnIndex - 1]
        && columns[columnIndex - 1].fixed !== 'right';
    return (
        <TableCell
            align={align}
            colSpan={colSpan}
            rowSpan={rowSpan}
            width={width}
            sx={sx}
            className={classNames({
                [styles["mr-table-column-scroll-left"]]: showLeftFixShadow,
                [styles["mr-table-column-scroll-right"]]: showRightFixShadow,
            })}
        >
            {data}
        </TableCell>
    )
}


type RecordTableRowProps<T> = Partial<RecordTableProps<T>> & {
    record: T;
    rowIndex: number;
    selectRowKeys: Array<string | number>;
    onSelectChange: (keys: Array<number | string>, index: number, select?: boolean, row?: T) => void;
    rowKey: number | string;
    expanded: boolean;
    onExpandChange: (key: number | string, expand: boolean, record: T) => void;
    scrollingInfo: { scrollTop: boolean; scrollLeft: boolean; scrollRight: boolean; };
}


const RecordTableRow = <T,>({
    record,
    columns,
    rowIndex,
    rowKey,
    selectRowKeys,
    onSelectChange,
    expanded,
    onExpandChange,
    scrollingInfo,
}: RecordTableRowProps<T>) => {
    const context = React.useContext<Partial<RecordTableProps<T>>>(MRTableContext);
    const {
        expandable,
        rowSelection,
        rowClassName,
        dropable
    } = context;
    const onCheckBoxChange = (e) => {
        const checked = e.target.checked;
        if (checked) {
            onSelectChange(Array.from(new Set([...selectRowKeys, rowKey])), rowIndex, true, record);
        } else {
            onSelectChange(selectRowKeys.filter(k => k !== rowKey), rowIndex, false, record);
        }
    }

    const onRadioChange = (e) => {
        const checked = e.target.checked;
        if (checked) {
            onSelectChange([rowKey], rowIndex, true, record);
        } else {
            onSelectChange([], rowIndex, false, record);
        }
    }

    const renderTableCells = () => {
        return columns.map((column, columnIndex) => {
            return (
                <RecordTableBodyCell
                    key={column.key}
                    columnKey={column.key}
                    width={column.width}
                    align={column.align}
                    data={getCellData<T>(column, record, rowIndex)}
                    onCell={column.onCell && column.onCell(record, rowIndex)}
                    columns={columns}
                    column={column}
                    columnIndex={columnIndex}
                    fixed={column.fixed}
                    scrollingInfo={scrollingInfo}
                />
            )
        })
    }

    const renderSelectionCell = () => {
        if (!rowSelection) return null;
        let sx = {};
        let className = classNames({
            [styles["mr-table-selection-fixed"]]: rowSelection?.fixed,
            [styles["mr-table-selection-fixed-after-expand"]]: expandable?.fixed
        })
        if (rowSelection.type === 'radio') {
            return (<TableCell sx={sx} padding='checkbox' className={className}>
                <Radio
                    checked={selectRowKeys[0] === rowKey}
                    onChange={onRadioChange}
                />
            </TableCell>);
        } else {
            return (<TableCell className={className} sx={sx} padding='checkbox'>
                <Checkbox
                    checked={selectRowKeys.includes(rowKey)}
                    onChange={onCheckBoxChange}
                />
            </TableCell>);
        }
    }

    const defaultExpandIcon = expanded
        ? <KeyboardArrowUpIcon />
        : <KeyboardArrowDownIcon />

    const renderExpandCell = () => {
        if (!expandable) return null;
        let sx = {};
        let className = classNames({
            [styles["mr-table-expandable-fixed"]]: expandable?.fixed
        })
        return <TableCell
            padding='checkbox'
            sx={sx}
            className={className}
        >
            <IconButton
                size="small"
                onClick={(e) => {
                    e.stopPropagation();
                    onExpandChange(rowKey, !expanded, record);
                }}
            >
                {expandable?.expandIcon
                    ? expandable?.expandIcon(record, rowIndex, expanded)
                    : defaultExpandIcon}
            </IconButton>

        </TableCell>
    }

    const renderExpandContent = () => {
        if (!expanded || !expandable) return null;
        let colSpan = columns.length + 1;
        if (rowSelection) colSpan += 1;
        const rowClassName = expandable?.expandedRowClassName
            ? expandable.expandedRowClassName(record, rowIndex)
            : '';
        const rowRender = expandable?.expandedRowRender
            ? expandable.expandedRowRender(record, rowIndex, expanded)
            : '';
        return <TableRow className={rowClassName}>
            <TableCell colSpan={colSpan}>
                {rowRender}
            </TableCell>
        </TableRow>
    }

    const onRowClick = (e) => {
        e.stopPropagation();
        if (expandable?.expandRowByClick) {
            onExpandChange(rowKey, !expanded, record);
        }
    }

    if (dropable) {
        const disabled = dropable.disabledRows ? dropable.disabledRows(record, rowIndex) : false;
        const {
            attributes,
            listeners,
            setNodeRef,
            transform,
            transition,
            isDragging,
            isSorting,
            isOver
        } = useSortable({ id: rowKey, disabled });
        console.log(isDragging, isOver, isSorting)
        let style = Object.assign({}, {
            transform: CSS.Transform.toString(transform),
            transition,
        }, isDragging ? dropable?.dragStyle : null);

        const finalClassNames = classNames(getRowClassName(record, rowClassName, rowIndex), {
            [styles["mr-table-row-disable"]]: disabled,
            [styles["mr-table-row-dragging"]]: isDragging,
        })
        return (
            <>
                <TableRow
                    hover
                    tabIndex={-1}
                    key={rowKey}
                    className={finalClassNames}
                    onClick={onRowClick}
                    ref={setNodeRef}
                    sx={style}
                    {...listeners}
                    {...attributes}
                >
                    {renderExpandCell()}
                    {renderSelectionCell()}
                    {renderTableCells()}
                </TableRow>
                {renderExpandContent()}
            </>
        )
    }

    return (
        <>
            <TableRow
                hover
                tabIndex={-1}
                key={rowKey}
                className={getRowClassName(record, rowClassName, rowIndex)}
                onClick={onRowClick}
            >
                {renderExpandCell()}
                {renderSelectionCell()}
                {renderTableCells()}
            </TableRow>
            {renderExpandContent()}
        </>
    )
}


type RecordTableBodyProps<T> = Partial<RecordTableProps<T>> & {
    selectRowKeys: Array<string | number>;
    onSelectChange: (keys: Array<number | string>, index: number, select?: boolean, row?: T) => void;
    expandedRowKeys: Array<string | number>;
    onExpandChange: (key: number | string, expand: boolean, record: T) => void;
    pageParams: Partial<TablePaginationProps>;
    scrollingInfo: { scrollTop: boolean; scrollLeft: boolean; scrollRight: boolean; };
}

const RecordTableBody = <T,>({
    rowKey,
    columns,
    dataSource,
    selectRowKeys,
    onSelectChange,
    expandedRowKeys,
    onExpandChange,
    pageParams,
    scrollingInfo,
}: RecordTableBodyProps<T>) => {
    const context = React.useContext<Partial<RecordTableProps<T>>>(MRTableContext);
    const {
        dropable
    } = context;
    const renderTableRows = () => {
        return dataSource.map((record, index) => {
            const finalRowKey = getRowKey(record, rowKey, index);
            const expanded = expandedRowKeys.includes(finalRowKey);
            return (
                <RecordTableRow<T>
                    key={finalRowKey}
                    columns={columns}
                    record={record}
                    rowIndex={index}
                    rowKey={finalRowKey}
                    selectRowKeys={selectRowKeys}
                    onSelectChange={onSelectChange}
                    expanded={expanded}
                    onExpandChange={onExpandChange}
                    scrollingInfo={scrollingInfo}
                />
            )
        })
    }

    if (dropable) {
        const sensors = useSensors(
            useSensor(PointerSensor, {
                activationConstraint: {
                    delay: dropable.delay || 0,
                    distance: dropable.distance || 0,
                }
            }),
            useSensor(KeyboardSensor, {
                coordinateGetter: sortableKeyboardCoordinates,
            })
        );

        const modifiers = [];

        if (dropable?.lockAxis) {
            modifiers.push(restrictToVerticalAxis);
        }

        const handleDragEnd = (e) => {
            const { active, over } = e;
            const dragKey = active.id;
            const dropKey = over.id;
            const dragRow = dataSource.find((d, i) => getRowKey(d, rowKey, i) === dragKey);
            const dropRow = dataSource.find((d, i) => getRowKey(d, rowKey, i) === dropKey);
            const dragIndex = dataSource.findIndex((d, i) => getRowKey(d, rowKey, i) === dragKey);
            const dropIndex = dataSource.findIndex((d, i) => getRowKey(d, rowKey, i) === dropKey);
            dropable?.onDropEnd({
                key: dragKey,
                index: dragIndex + pageParams.page * pageParams.rowsPerPage,
                record: dragRow
            }, {
                key: dropKey,
                index: dropIndex + pageParams.page * pageParams.rowsPerPage,
                record: dropRow
            })
        }

        return (
            <TableBody>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    modifiers={modifiers}
                >
                    <SortableContext
                        items={dataSource.map((r, i) => getRowKey(r, rowKey, i))}
                        strategy={verticalListSortingStrategy}
                    >
                        {renderTableRows()}
                    </SortableContext>
                </DndContext>

            </TableBody>
        )
    }
    return (
        <TableBody>
            {renderTableRows()}
        </TableBody>
    )
}

export default RecordTableBody;