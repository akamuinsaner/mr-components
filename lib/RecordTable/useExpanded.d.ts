import { RecordTableProps, RecordTableExpandable } from './index';
type UseExpandedProps<T> = {
    data: T[];
    rowKey: RecordTableProps<T>["rowKey"];
    expandable: RecordTableExpandable<T>;
};
declare const _default: <T>({ expandable, rowKey, data, }: UseExpandedProps<T>) => {
    expandedRowKeys: (string | number)[];
    onExpandChange: (rowKey: any, expand: any, record: any) => void;
};
export default _default;
