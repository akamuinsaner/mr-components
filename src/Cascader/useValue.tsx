import React from 'react';
import { CascaderProps, CascaderOption } from './index';
import { DataSet } from '../utils/getTreeDataFormatted';

type UseValueProps = {
    value: CascaderProps["value"];
    multiple: CascaderProps["multiple"];
    onChange: CascaderProps["onChange"];
    dataSet: DataSet<CascaderOption>;
    checkWithRelation: CascaderProps["checkWithRelation"];
}

export default ({
    value,
    multiple,
    onChange,
    dataSet,
    checkWithRelation,
}: UseValueProps) => {
    const { idChildrenIdMap, parentChainMap } = dataSet;
    const getValue = (value) => {
        if (Array.isArray(value)) return value;
        if (value) return [value];
        return [];
    }

    const [selected, setSelected] = React.useState<Array<string | number>>(getValue(value));

    const onValueChange = (changedData: Array<string | number>) => {
        if (onChange) onChange(multiple ? changedData : changedData[0]);
        if (!value) setSelected(changedData);
    }

    React.useEffect(() => {
        if (value) setSelected(getValue(value));
    }, [value]);

    const toggleCheck = (node: CascaderOption, checked: boolean) => {
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

        onValueChange(newCheckedKeys);
    }

    const onOptionSelect = (o: CascaderOption) => {
        if (multiple) {
            if (selected.includes(o.id)) {
                onValueChange(selected.filter(s => s !== o.id));
            } else {
                onValueChange([...selected, o.id]);
            }
        } else {
            onValueChange([o.id]);
        }
    };

    return {
        selected,
        toggleCheck,
        onValueChange,
        onOptionSelect
    }
}