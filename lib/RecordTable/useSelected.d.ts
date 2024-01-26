import { RecordTableProps, RecordTableRowSelection } from './index';
type UseSelectedProps<T> = {
    data: T[];
    rowKey: RecordTableProps<T>["rowKey"];
    rowSelection: RecordTableRowSelection<T>;
};
declare const _default: <T>({ data, rowKey, rowSelection }: UseSelectedProps<T>) => {
    selectRowKeys: (string | number)[];
    onSelectChange: (keys: Array<number | string>, index: number, select?: boolean, row?: T) => void;
    onSelectAll: (keys: Array<number | string>, rows: T[]) => void;
};
export default _default;
