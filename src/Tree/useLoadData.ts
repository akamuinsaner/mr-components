import React from 'react';
import { TreeData, TreeProps } from './index';

type UseLoadDataProps = {
    loadData: TreeProps["loadData"];
    toggleExpand: (node: TreeData, expand: boolean) => void;
}

export default ({
    loadData,
    toggleExpand
}: UseLoadDataProps) => {
    const [loadingId, setLoadingId] = React.useState<string | number>(null);

    const startLoadData = (option) => {
        if (!loadData) return;
        setLoadingId(option.id)
        loadData(option).then(data => {
            toggleExpand(option, true);
        }).finally(() => {
            setLoadingId(null)
        })
    }

    return {
        loadingId,
        startLoadData
    }
}