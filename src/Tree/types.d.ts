import { DataSet } from '../utils/getTreeDataFormatted';


export type TreeData = {
    id: number | string;
    name: React.ReactNode | string | number;
    parentId?: number | string;
    children?: TreeData[];
    disableCheckbox?: boolean;
    disabled?: boolean;
}

export type TreeProps = {
    blockNodes?: boolean;
    checkable?: boolean;
    checkedKeys?: Array<number | string>;
    checkWithRelation?: boolean;
    className?: string;
    defaultCheckedKeys?: Array<number | string>;
    defaultCheckedAll?: boolean;
    defaultExpandedKeys?: Array<number | string>;
    defaultExpandAll?: boolean;
    defaultSelectedKeys?: Array<number | string>;
    defaultSelectAll?: boolean;
    draggable?: boolean;
    expandedKeys?: Array<number | string>;
    onCheck?: (checkedKeys: Array<number | string>, checked: boolean, node: TreeData) => void;
    onDrop?: (active: TreeData, over: TreeData) => void;
    onExpand?: (expandedKeys: Array<number | string>, expanded: boolean, node: TreeData) => void;
    onSelect?: (selectedKeys: Array<number | string>, selected: boolean, node: TreeData) => void;
    selectedKeys?: Array<number | string>;
    showLine?: boolean;
    switchIcon?: React.ReactNode | ((node: TreeData, expand: boolean) => React.ReactNode);
    sx?: SxProps;
    treeData: TreeData[]
}

export type TreeNodeProps = {
    blockNodes?: boolean;
    activeId: any;
    checkable?: boolean;
    checked: boolean;
    data: TreeData;
    depth: number;
    draggable: boolean;
    indeterminate: boolean;
    expand: boolean;
    overId: any;
    toggleCheck: (node: TreeData, checked: boolean) => void;
    toggleExpand: (node: TreeData, expand: boolean) => void;
    selected: boolean;
    toggleSelect: (node: TreeData, select: boolean) => void;
    showLine?: boolean;
    idSiblingsAfterMap: Map<TreeData["id"], TreeData[]>;
    switchIcon?: React.ReactNode | ((node: TreeData, expand: boolean) => React.ReactNode);
    parentChain: TreeData["id"][];
}

export type UseCheckedProps = {
    dataSet: DataSet<TreeData>,
    checkedKeys?: Array<number | string>;
    checkWithRelation?: boolean;
    defaultCheckedKeys?: Array<number | string>;
    defaultCheckedAll?: boolean;
    onCheck?: (checkedKeys: Array<number | string>, checked: boolean, node: TreeData) => void;
}

export type UseExpandedProps = {
    dataSet:  DataSet<TreeData>,
    defaultExpandedKeys?: Array<number | string>;
    defaultExpandAll?: boolean;
    expandedKeys?: Array<number | string>;
    onExpand?: (expandedKeys: Array<number | string>, expanded: boolean, node: TreeData) => void;
}

export type UseSelectedProps = {
    dataSet:  DataSet<TreeData>,
    defaultSelectedKeys?: Array<number | string>;
    defaultSelectAll?: boolean;
    selectedKeys?: Array<number | string>;
    onSelect?: (selectedKeys: Array<number | string>, selected: boolean, node: TreeData) => void;
}

export type UseDndProps = {
    dataSet:  DataSet<TreeData>;
    toggleExpand: (node: TreeData, expand: boolean) => void;
    onDrop: (active: TreeData, over: TreeData) => void;
}