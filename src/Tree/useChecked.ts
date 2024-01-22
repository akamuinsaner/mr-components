import React from 'react';
import { TreeData, UseCheckedProps } from './types';



export default ({
    dataSet,
    checkedKeys,
    checkWithRelation,
    defaultCheckedKeys,
    defaultCheckedAll,
    onCheck
}: UseCheckedProps) => {
    const {
        idChildrenIdMap,
        parentChainMap,
        flattedData,
    } = dataSet;
    const [checkKeys, setCheckKeys] = React.useState<Array<number | string>>([]);

    const toggleCheck = (node: TreeData, checked: boolean, defaultSet: boolean = false) => {
        let newCheckedKeys = defaultSet ? [] : [...checkKeys];
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
        if (defaultSet) {
            return newCheckedKeys;
        } else {
            if (onCheck) onCheck(newCheckedKeys, checked, node);
            if (!checkedKeys) setCheckKeys(newCheckedKeys);
        }
    }

    const getDefaultCheckedKeys = () => {
        if (defaultCheckedKeys) {
            const nodes = flattedData.filter(o => defaultCheckedKeys.includes(o.id));
            let keys = [];
            nodes.forEach(node => {
                const set = new Set([...keys, ...toggleCheck(node, true, true)]);
                keys = [...set];
            });
            return keys;
        }
        if (defaultCheckedAll) {
            return flattedData.map(o => o.id);
        }
        return [];
    }

    React.useEffect(() => setCheckKeys(getDefaultCheckedKeys()), []);

    React.useEffect(() => {
        if (checkedKeys) {
            const nodes = flattedData.filter(o => checkedKeys.includes(o.id));
            let keys = [];
            nodes.forEach(node => {
                const set = new Set([...keys, ...toggleCheck(node, true, true)]);
                keys = [...set];
            });
            if (checkWithRelation) setCheckKeys(keys);
            else setCheckKeys(checkedKeys);
        }
    }, [checkedKeys]);

    return {
        checkKeys,
        setCheckKeys,
        toggleCheck,
    };
}