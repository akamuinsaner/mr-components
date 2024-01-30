import React from 'react';
import { TreeSelectOption } from './index';
import Checkbox from '@mui/material/Checkbox';
import { DataSet } from '../utils/getTreeDataFormatted';

export type CheckProps = {
    show: boolean;
    selected: Array<TreeSelectOption["id"]>;
    option: TreeSelectOption;
    toggleCheck: (node: TreeSelectOption, checked: boolean) => void;
    parentChainMap: DataSet<TreeSelectOption>["parentChainMap"];
    idChildrenIdMap: DataSet<TreeSelectOption>["idChildrenIdMap"];
    checkWithRelation: boolean;
}

export default ({
    show,
    option,
    selected,
    toggleCheck,
    idChildrenIdMap,
    checkWithRelation
}: CheckProps) => {
    if (!show) return null;

    const styles = { padding: '0', marginRight: '5px' };

    const checked = selected.includes(option.id);
    const onCheck = e => toggleCheck(option, e.target.checked);
    const indeterminate = !!idChildrenIdMap.get(option.id).find(id => selected.includes(id))
        && !checked
        && checkWithRelation;

    return (
        <Checkbox
            sx={styles}
            onClick={e => e.stopPropagation()}
            onChange={onCheck}
            checked={checked}
            indeterminate={indeterminate}
        />
    )

}