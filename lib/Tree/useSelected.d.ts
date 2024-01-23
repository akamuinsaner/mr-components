import React from 'react';
import { TreeData } from './index';
import { DataSet } from '../utils/getTreeDataFormatted';
export type UseSelectedProps = {
    dataSet: DataSet<TreeData>;
    defaultSelectedKeys?: Array<number | string>;
    defaultSelectAll?: boolean;
    selectedKeys?: Array<number | string>;
    onSelect?: (selectedKeys: Array<number | string>, selected: boolean, node: TreeData) => void;
};
declare const _default: ({ dataSet, defaultSelectedKeys, defaultSelectAll, selectedKeys, onSelect, }: UseSelectedProps) => {
    selectKeys: (string | number)[];
    setSelectKeys: React.Dispatch<React.SetStateAction<(string | number)[]>>;
    toggleSelect: (node: TreeData, select: boolean) => void;
};
export default _default;
