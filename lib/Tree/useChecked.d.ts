import React from 'react';
import { TreeData, UseCheckedProps } from './types';
declare const _default: ({ dataSet, checkedKeys, checkWithRelation, defaultCheckedKeys, defaultCheckedAll, onCheck }: UseCheckedProps) => {
    checkKeys: (string | number)[];
    setCheckKeys: React.Dispatch<React.SetStateAction<(string | number)[]>>;
    toggleCheck: (node: TreeData, checked: boolean, defaultSet?: boolean) => (string | number)[];
};
export default _default;
