import React from 'react';
import { PopperPlacementType } from '@mui/material/Popper';
import { TextFieldProps } from '@mui/material';
export type TreeSelectOption = {
    id: number | string;
    name: React.ReactNode | string | number;
    parentId?: number | string;
    children?: TreeSelectOption[];
};
export type TreeSelectProp = TextFieldProps & {
    options: TreeSelectOption[];
    multiple?: boolean;
    placement?: PopperPlacementType;
    checkable?: boolean;
    defaultExpandAll?: boolean;
    defaultExpandedKeys?: Array<TreeSelectOption["id"]>;
    expandedKeys?: Array<number | string>;
    popperStyle?: React.CSSProperties;
    popperClassName?: string;
    search?: boolean;
    value?: any;
    onChange?: (v: any) => void;
    onExpand?: (expandedKeys: Array<number | string>) => void;
    loadData?: (o: TreeSelectOption) => Promise<TreeSelectOption[]>;
    allowClear?: boolean;
    maxTagCount?: number | 'responsive';
};
declare const TreeSelect: ({ search, options, multiple, placement, checkable, defaultExpandAll, defaultExpandedKeys, popperStyle, popperClassName, value, expandedKeys, onChange, onExpand, loadData, allowClear, maxTagCount, ...inputProps }: TreeSelectProp) => import("react/jsx-runtime").JSX.Element;
export default TreeSelect;
