import { RecordTableColumn } from '.';
export type RecordTableFilters = {
    parentId?: string | number;
    name: string;
    id: string | number;
    children?: RecordTableFilters;
};
export type ReactTableFilterModes = 'autoComplete' | 'input' | 'checkbox';
export type RecordTableFilterProps = {
    column: RecordTableColumn<any>;
    index: number;
    value?: Array<string | number>;
    onChange?: (value: Array<string | number>) => void;
    children?: any;
};
declare const _default: ({ column, index, value, onChange, children }: RecordTableFilterProps) => import("react/jsx-runtime").JSX.Element;
export default _default;
