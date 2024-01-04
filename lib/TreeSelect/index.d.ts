import React from 'react';
import { TextFieldProps } from '@mui/material';
import { PopperPlacementType } from '@mui/material/Popper';
export type TreeSelectOption = {
    id: number | string;
    name: string | React.ReactNode;
    parentId?: number | string;
    children?: TreeSelectOption[];
};
export type TreeSelectProp = TextFieldProps & {
    options: TreeSelectOption[];
    multiple?: boolean;
    placement?: PopperPlacementType;
    checkable?: boolean;
    expandAll?: boolean;
    expandKeys?: Array<number | string>;
    popperStyle?: React.CSSProperties;
    popperClassName?: string;
    search?: boolean;
    value?: any;
    onChange?: (v: any) => void;
    loadData?: (o: TreeSelectOption) => Promise<TreeSelectOption[]>;
    allowClear?: boolean;
    maxTagCount?: number | 'responsive';
};
declare const TreeSelect: ({ search, options, multiple, placement, checkable, expandAll, popperStyle, popperClassName, value, expandKeys, onChange, loadData, allowClear, maxTagCount, ...inputProps }: TreeSelectProp) => import("react/jsx-runtime").JSX.Element;
export default TreeSelect;
