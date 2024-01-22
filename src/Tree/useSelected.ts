import React from 'react';
import { TreeData, UseSelectedProps } from './types';

export default ({
    dataSet,
    defaultSelectedKeys,
    defaultSelectAll,
    selectedKeys,
    onSelect,
}: UseSelectedProps) => {
    const { flattedData } = dataSet;
    const getDefaultSelectKeys = () => {
        if (defaultSelectedKeys) return defaultSelectedKeys;
        if (defaultSelectAll) return flattedData.map(node => node.id);
        return [];
    }
    const [selectKeys, setSelectKeys] = React.useState<Array<number | string>>([]);

    const toggleSelect = (node: TreeData, select: boolean) => {
        let newKeys: Array<string | number> = [];
        if (select) newKeys = [...selectKeys, node.id];
        else newKeys = selectKeys.filter(key => key !== node.id);
        if (!selectedKeys) setSelectKeys(newKeys);
        if (onSelect) onSelect(newKeys, select, node);
    }

    React.useEffect(() => setSelectKeys(getDefaultSelectKeys()), []);

    React.useEffect(() => {
        if (selectedKeys) setSelectKeys(selectedKeys);
    }, [selectedKeys]);

    return {
        selectKeys,
        setSelectKeys,
        toggleSelect,
    }
}