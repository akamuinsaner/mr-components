import React from 'react';
import { TreeData } from './index';
import { DataSet } from '../utils/getTreeDataFormatted';
export type UseCheckedProps = {
    dataSet: DataSet<TreeData>;
    checkedKeys?: Array<number | string>;
    checkWithRelation?: boolean;
    defaultCheckedKeys?: Array<number | string>;
    defaultCheckedAll?: boolean;
    onCheck?: (checkedKeys: Array<number | string>, checked: boolean, node: TreeData) => void;
};
declare const _default: ({ dataSet, checkedKeys, checkWithRelation, defaultCheckedKeys, defaultCheckedAll, onCheck }: UseCheckedProps) => {
    checkKeys: (string | number)[];
    setCheckKeys: React.Dispatch<React.SetStateAction<(string | number)[]>>;
    toggleCheck: (node: TreeData, checked: boolean, defaultSet?: boolean) => (string | number)[];
};
export default _default;
