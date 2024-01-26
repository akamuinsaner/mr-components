import React from 'react';
import {
    RecordTableProps,
    RecordTableRowSelection
} from './index';
import { getRowsFromKeys } from './helper';

type UseSelectedProps<T> = {
    data: T[];
    rowKey: RecordTableProps<T>["rowKey"];
    rowSelection: RecordTableRowSelection<T>;
}

export default <T>({
    data,
    rowKey,
    rowSelection
}: UseSelectedProps<T>) => {
    const [selectRowKeys, setSelectRowKeys]
        = React.useState<Array<number | string>>(rowSelection?.defaultSelectedRowKeys || []);

    const onSelectChange = (keys: Array<number | string>, index: number, select?: boolean, row?: T) => {
        if (!rowSelection?.selectedRowKeys) {
            setSelectRowKeys(keys);
        }
        if (rowSelection?.onChange) {
            rowSelection.onChange(keys, getRowsFromKeys(data, keys, rowKey));
        }
        if (rowSelection?.onSelect && row) {
            rowSelection.onSelect(row, select);
        }
    }

    const onSelectAll = (keys: Array<number | string>, rows: T[]) => {
        if (!rowSelection?.selectedRowKeys) setSelectRowKeys(keys);
        if (rowSelection?.onChange) rowSelection?.onChange(keys, rows);
    }

    React.useEffect(() => {
        if (rowSelection?.selectedRowKeys) {
            setSelectRowKeys(rowSelection?.selectedRowKeys);
        }
    }, [rowSelection?.selectedRowKeys]);

    return {
        selectRowKeys,
        onSelectChange,
        onSelectAll
    }
}