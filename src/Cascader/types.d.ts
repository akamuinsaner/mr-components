import { TreeSelectOption } from '../TreeSelect';

export type CascaderOption = TreeSelectOption;

export type CascaderProps = {
    options: CascaderOption[];
    multiple?: boolean;
    checkable?: boolean;
    popperStyle?: React.CSSProperties;
    popperClassName?: string;
    search?: boolean;
    value?: any;
    onChange?: (v: any) => void;
    loadData?: (o: CascaderOption) => Promise<CascaderOption[]>;
    allowClear?: boolean;
    maxTagCount?: number | 'responsive';
}

export type DropDownProps = {
    anchorEl: HTMLElement;
    popperStyle: CascaderProps["popperStyle"];
    popperClassName: CascaderProps["popperClassName"];
    children: React.ReactNode;
    depth: number;
}

export type OptionProps = {
    dense: boolean;
    parentId: CascaderOption["id"];
    showCheck: boolean;
    inputValue: string;
    selected: Array<CascaderOption["id"]>;
    search: CascaderProps["search"];
    flatOptions: CascaderOption[];
    multiple: CascaderProps["multiple"];
    allChildrenMap: Map<number | string, CascaderOption[]>;
    setSelected: (s: Array<CascaderOption["id"]>) => void;
    loadData: CascaderProps["loadData"];
    setFlattedOptions: (f: CascaderOption[]) => void;
    openChildren: (id: CascaderOption["id"]) => void;
}

export type ExpandIconProps = {
    hasChildren: boolean;
    isLoading: boolean;
    openChildren: () => void;
    startLoadData: () => void;
    loadData: CascaderProps["loadData"];
}