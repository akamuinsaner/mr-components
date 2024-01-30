import React from 'react';
import { TreeSelectProp, TreeSelectOption } from './index';

type UseLoadDataProps = {
    loadData: TreeSelectProp["loadData"];
    toggleExpand: (id: TreeSelectOption["id"]) => void;
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
            toggleExpand(option.id);
        }).finally(() => {
            setLoadingId(null)
        })
    }

    return {
        loadingId,
        startLoadData
    }
}