import React from 'react';
import { TreeData } from './index';
import { DataSet } from '../utils/getTreeDataFormatted';

export type UseExpandedProps = {
    dataSet:  DataSet<TreeData>,
    defaultExpandedKeys?: Array<number | string>;
    defaultExpandAll?: boolean;
    expandedKeys?: Array<number | string>;
    onExpand?: (expandedKeys: Array<number | string>, expanded: boolean, node: TreeData) => void;
}

export default ({
    dataSet,
    defaultExpandedKeys,
    defaultExpandAll,
    expandedKeys,
    onExpand,
}: UseExpandedProps) => {
    const { flattedData } = dataSet;
    const [ expandKeys, setExpandKeys ] = React.useState<Array<number | string>>([]);

    const getDefaultExpandKeys = () => {
        if (defaultExpandedKeys) return defaultExpandedKeys;
        if (defaultExpandAll) {
            const nodeWithChildren = flattedData
                .filter(node => node.children && node.children.length);
            return nodeWithChildren.map(node => node.id);
        }
        return [];
    }

    React.useEffect(() => setExpandKeys(getDefaultExpandKeys()), []);

    const toggleExpand = (node: TreeData, expand: boolean) => {
        let newKeys: Array<string | number> = [];
        if (expand) newKeys = [...expandKeys, node.id];
        else newKeys = expandKeys.filter(key => key !== node.id);
        if (!expandedKeys) setExpandKeys(newKeys);
        if (onExpand) onExpand(newKeys, expand, node);
    }

    React.useEffect(() => {
        if (expandedKeys) setExpandKeys(expandedKeys);
    }, [expandedKeys]);

    return {
        expandKeys,
        setExpandKeys,
        toggleExpand,
    }
}