import React from 'react';
import { TreeData } from './index';
import { DataSet } from '../utils/getTreeDataFormatted';
export type UseExpandedProps = {
    dataSet: DataSet<TreeData>;
    defaultExpandedKeys?: Array<number | string>;
    defaultExpandAll?: boolean;
    expandedKeys?: Array<number | string>;
    onExpand?: (expandedKeys: Array<number | string>, expanded: boolean, node: TreeData) => void;
};
declare const _default: ({ dataSet, defaultExpandedKeys, defaultExpandAll, expandedKeys, onExpand, }: UseExpandedProps) => {
    expandKeys: (string | number)[];
    setExpandKeys: React.Dispatch<React.SetStateAction<(string | number)[]>>;
    toggleExpand: (node: TreeData, expand: boolean) => void;
};
export default _default;
