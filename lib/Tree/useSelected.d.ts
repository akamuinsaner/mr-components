import React from 'react';
import { TreeData, UseSelectedProps } from './types';
declare const _default: ({ dataSet, defaultSelectedKeys, defaultSelectAll, selectedKeys, onSelect, }: UseSelectedProps) => {
    selectKeys: (string | number)[];
    setSelectKeys: React.Dispatch<React.SetStateAction<(string | number)[]>>;
    toggleSelect: (node: TreeData, select: boolean) => void;
};
export default _default;
