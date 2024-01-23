import React from 'react';
import { TreeSelectOption } from './index';
import Checkbox from '@mui/material/Checkbox';

export type CheckProps = {
    show: boolean;
    selected: Array<TreeSelectOption["id"]>;
    option: TreeSelectOption;
    allChildrenMap: Map<number | string, TreeSelectOption[]>;
    setSelected: (s: Array<TreeSelectOption["id"]>) => void;
}

export default ({
    show,
    option,
    selected,
    setSelected,
    allChildrenMap
}: CheckProps) => {
    if (!show) return null;

    const styles = { padding: '0', marginRight: '5px' };

    const acwcIds = (allChildrenMap
        .get(option.id) || [])
        .filter(c => !(c.children && c.children.length))
        .map(c => c.id);

    const checked = selected.includes(option.id)
        || (acwcIds.length && acwcIds.every(id => selected.includes(id)))

    const indeterminate = acwcIds.some(id => selected.includes(id))
        && !acwcIds.every(id => selected.includes(id))

    const onCheck = (e) => {
        const checked = e.target.checked;
        if (checked) {
            if (!!acwcIds.length) setSelected(Array.from(new Set([...selected, ...acwcIds])));
            else setSelected(Array.from(new Set([...selected, option.id])));
        } else {
            if (!!acwcIds.length) setSelected(selected.filter(id => !acwcIds.includes(id)));
            else setSelected(selected.filter(id => id !== option.id));
        } 
    }

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