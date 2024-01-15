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

type RecordTableCellProps<T> = {
    data: any;
    align: 'left' | 'right' | 'center';
    onCell: any;
    width: number;
    columns: RecordTableColumn<T>[];
    columnKey: any;
    fixed: 'left' | 'right';
}

const RecordTableBodyCell = <T,>({
    data,
    align,
    onCell,
    width,
    columns,
    columnKey,
    fixed
}: RecordTableCellProps<T>) => {
    const colSpan = onCell?.colSpan;
    const rowSpan = onCell?.rowSpan;

    if (colSpan === 0 || rowSpan === 0) return;
    let sx = onCell?.sx || {};
    const fixedStyle = getFixedStyle(fixed, columns, columnKey);
    sx = Object.assign({}, fixedStyle, sx);
    return (
        <TableCell
            align={align}
            colSpan={colSpan}
            rowSpan={rowSpan}
            width={width}
            sx={sx}
        >
            {data}
        </TableCell>
    )
}


type RecordTableRowProps<T> = Partial<RecordTableProps<T>> & {
    record: T;
    index: number;
    selectRowKeys: Array<string | number>;
    onSelectChange: (keys: Array<number | string>, index: number, select?: boolean, row?: T) => void;
    rowKey: number | string;
    expanded: boolean;
    onExpandChange: (key: number | string, expand: boolean, record: T) => void;
}


const RecordTableRow = <T,>({
    record,
    columns,
    index,
    rowKey,
    selectRowKeys,
    onSelectChange,
    expanded,
    onExpandChange,
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
            onSelectChange(Array.from(new Set([...selectRowKeys, rowKey])), index, true, record);
        } else {
            onSelectChange(selectRowKeys.filter(k => k !== rowKey), index, false, record);
        }
    }

    const onRadioChange = (e) => {
        const checked = e.target.checked;
        if (checked) {
            onSelectChange([rowKey], index, true, record);
        } else {
            onSelectChange([], index, false, record);
        }
    }

    const renderTableCells = () => {
        return columns.map(column => {
            return (
                <RecordTableBodyCell
                    key={column.key}
                    columnKey={column.key}
                    width={column.width}
                    align={column.align}
                    data={getCellData<T>(column, record, index)}
                    onCell={column.onCell && column.onCell(record, index)}
                    columns={columns}
                    fixed={column.fixed}
                />
            )
        })
    }

    const renderSelectionCell = () => {
        if (!rowSelection) return null;
        if (rowSelection.type === 'radio') {
            return <TableCell padding='checkbox'><Radio
                checked={selectRowKeys[0] === rowKey}
                onChange={onRadioChange}
            /></TableCell>;
        } else {
            return <TableCell padding='checkbox'><Checkbox
                checked={selectRowKeys.includes(rowKey)}
                onChange={onCheckBoxChange}
            /></TableCell>;
        }
    }

    const defaultExpandIcon = expanded
        ? <KeyboardArrowUpIcon />
        : <KeyboardArrowDownIcon />

    const renderExpandCell = () => {
        if (!expandable) return null;
        return <TableCell
            padding='checkbox'
        >
            <IconButton
                size="small"
                onClick={(e) => {
                    e.stopPropagation();
                    onExpandChange(rowKey, !expanded, record);
                }}
            >
                {expandable?.expandIcon
                    ? expandable?.expandIcon(record, index, expanded)
                    : defaultExpandIcon}
            </IconButton>

        </TableCell>
    }

    const renderExpandContent = () => {
        if (!expanded || !expandable) return null;
        let colSpan = columns.length + 1;
        if (rowSelection) colSpan += 1;
        const rowClassName = expandable?.expandedRowClassName(record, index);
        const rowRender = expandable?.expandedRowRender(record, index, expanded);
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
        const disabled = dropable.disabledRows ? dropable.disabledRows(record, index) : false;
        const {
            attributes,
            listeners,
            setNodeRef,
            transform,
            transition,
            isDragging
        } = useSortable({
            id: rowKey,
            disabled,
        });

        let style = {
            transform: CSS.Transform.toString(transform),
            transition,
            cursor: 'grab'
        };

        const draggingStyles = {
            background: '#fff',
            boxShadow: '8px 5px 10px rgba(0, 0, 0, 0.3)',
            userSelect: 'none'
        }

        const disableStyles = {
            cursor: 'not-allowed',
            background: '#eee',
            '& .MuiTableCell-root': {
                color: '#aaa',
            }
        }

        if (isDragging) {
            style = Object.assign({}, style, draggingStyles, dropable.dragStyle);
        }

        if (disabled) {
            style = Object.assign({}, style, disableStyles, dropable.disableStyle);
        }

        return (
            <>
                <TableRow
                    hover
                    tabIndex={-1}
                    key={rowKey}
                    className={getRowClassName(record, rowClassName, index)}
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
                className={getRowClassName(record, rowClassName, index)}
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
    pageParams: Partial<TablePaginationProps>
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
                    index={index}
                    rowKey={finalRowKey}
                    selectRowKeys={selectRowKeys}
                    onSelectChange={onSelectChange}
                    expanded={expanded}
                    onExpandChange={onExpandChange}
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