import React from 'react';
import { TreeSelectOption } from './index';
import Checkbox from '@mui/material/Checkbox';
import { DataSet } from '../utils/getTreeDataFormatted';

export type CheckProps = {
    show: boolean;
    selected: Array<TreeSelectOption["id"]>;
    option: TreeSelectOption;
    setSelected: (s: Array<TreeSelectOption["id"]>) => void;
    parentChainMap: DataSet<TreeSelectOption>["parentChainMap"];
    idChildrenIdMap: DataSet<TreeSelectOption>["idChildrenIdMap"];
    checkWithRelation: boolean;
}

export default ({
    show,
    option,
    selected,
    setSelected,
    parentChainMap,
    idChildrenIdMap,
    checkWithRelation
}: CheckProps) => {
    if (!show) return null;

    const styles = { padding: '0', marginRight: '5px' };

    const toggleCheck = (node: TreeSelectOption, checked: boolean) => {
        let newCheckedKeys = [...selected];
        if (checkWithRelation) {
            const selfAndAllChildrenKeys = [node.id, ...idChildrenIdMap.get(node.id)];
            if (checked) {
                newCheckedKeys = [...(new Set([...newCheckedKeys, ...selfAndAllChildrenKeys]))];
            } else {
                newCheckedKeys = newCheckedKeys.filter(key => !selfAndAllChildrenKeys.includes(key));
            }
            const parentChain = parentChainMap.get(node.id);
            parentChain.forEach(parentId => {
                if (checked) {
                    const allChildrenKeys = idChildrenIdMap.get(parentId);
                    const notAllIn = !!allChildrenKeys.find(key => !newCheckedKeys.includes(key));
                    if (!notAllIn) newCheckedKeys = [...newCheckedKeys, parentId];
                } else {
                    newCheckedKeys = newCheckedKeys.filter(key => key !== parentId);
                }
            })
        } else {
            if (checked) newCheckedKeys = [...newCheckedKeys, node.id];
            else newCheckedKeys = newCheckedKeys.filter(key => key !== node.id);
        }

        setSelected(newCheckedKeys);
    }

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