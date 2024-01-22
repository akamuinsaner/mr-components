import React from 'react';
import { PopperPlacementType } from '@mui/material/Popper';
import { TextFieldProps } from '@mui/material';

export type TreeSelectOption = {
    id: number | string;
    name: React.ReactNode | string | number;
    parentId?: number | string;
    children?: TreeSelectOption[];
}

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
}

export type DropDownProps = {
    anchorEl: HTMLElement;
    initialWidth: number;
    placement: TreeSelectProp["placement"];
    popperStyle: TreeSelectProp["popperStyle"];
    popperClassName: TreeSelectProp["popperClassName"];
    children: React.ReactNode
}

export type OptionsProps = {
    dense: boolean;
    expandKeys: Array<TreeSelectOption["id"]>;
    expandAll: boolean;
    showCheck: boolean;
    inputValue: string;
    selected: Array<TreeSelectOption["id"]>;
    search: TreeSelectProp["search"];
    flatOptions: TreeSelectOption[];
    multiple: TreeSelectProp["multiple"];
    allChildrenMap: Map<number | string, TreeSelectOption[]>;
    setSelected: (s: Array<TreeSelectOption["id"]>) => void;
    loadData: TreeSelectProp["loadData"];
    setFlattedOptions: (f: TreeSelectOption[]) => void;
}

export type CheckProps = {
    show: boolean;
    selected: Array<TreeSelectOption["id"]>;
    option: TreeSelectOption;
    allChildrenMap: Map<number | string, TreeSelectOption[]>;
    setSelected: (s: Array<TreeSelectOption["id"]>) => void;
}

export type ExpandIconProps = {
    showChildren: boolean;
    hasChildren: boolean;
    isLoading: boolean;
    visibility: boolean;
    toggleOpen: (o: boolean) => void;
    startLoadData: () => void;
}

export type UseTagLimitsProps = {
    maxTagCount?: number | 'responsive';
    selected: Array<string | number>;
    inputRef: React.MutableRefObject<any>;
}