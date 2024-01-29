import React from 'react';
import { TreeSelectOption, TreeSelectProp } from './index';
import { RESERVED_KEY, DataSet } from '../utils/getTreeDataFormatted';

type UseExpandedProps = {
    flattedData: DataSet<TreeSelectOption>["flattedData"];
    defaultExpandAll: TreeSelectProp["defaultExpandAll"];
    defaultExpandedKeys: TreeSelectProp["defaultExpandedKeys"];
    expandedKeys: TreeSelectProp["expandedKeys"];
    onExpand: TreeSelectProp["onExpand"]
}

export default ({
    flattedData,
    defaultExpandAll,
    defaultExpandedKeys,
    expandedKeys,
    onExpand
}: UseExpandedProps) => {
    const getDefaultExpandKeys = () => {
        if (defaultExpandedKeys) return defaultExpandedKeys;
        if (defaultExpandAll) return flattedData.map(o => o.id);
        return [];
    }

    const [
        expandKeys,
        setExpandKeys,
    ] = React.useState<Array<TreeSelectOption["id"]>>(getDefaultExpandKeys());

    const toggleExpand = (id: TreeSelectOption["id"]) => {
        let keys = [];
        if (!expandKeys.includes(id)) keys = [...expandKeys, id];
        else keys = expandKeys.filter(item => item !== id);
        if (onExpand) onExpand(keys);
        if (!expandedKeys) setExpandKeys(keys);
    }

    React.useEffect(() => {
        if (expandedKeys) setExpandKeys(expandedKeys);
    }, [expandedKeys]);

    return {
        expandKeys,
        toggleExpand
    }
}