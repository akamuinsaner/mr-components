import React from 'react';
import { TextFieldProps } from '@mui/material';
import { TreeSelectOption } from '../TreeSelect';
export type CascaderOption = TreeSelectOption;
export type CascaderProps = {
    options: CascaderOption[];
    multiple?: boolean;
    checkable?: boolean;
    checkWithRelation?: boolean;
    popperStyle?: React.CSSProperties;
    popperClassName?: string;
    search?: boolean;
    value?: any;
    onChange?: (v: any) => void;
    loadData?: (o: CascaderOption) => any;
    allowClear?: boolean;
    maxTagCount?: number | 'responsive';
};
declare const Cascader: ({ search, options, multiple, checkable, checkWithRelation, popperStyle, popperClassName, value, onChange, loadData, allowClear, maxTagCount, ...inputProps }: TextFieldProps & CascaderProps) => import("react/jsx-runtime").JSX.Element;
export default Cascader;
