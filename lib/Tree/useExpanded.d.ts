import React from 'react';
import { TreeData, UseExpandedProps } from './types';
declare const _default: ({ dataSet, defaultExpandedKeys, defaultExpandAll, expandedKeys, onExpand, }: UseExpandedProps) => {
    expandKeys: (string | number)[];
    setExpandKeys: React.Dispatch<React.SetStateAction<(string | number)[]>>;
    toggleExpand: (node: TreeData, expand: boolean) => void;
};
export default _default;
