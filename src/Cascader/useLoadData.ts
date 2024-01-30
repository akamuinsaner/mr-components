import React from 'react';
import { CascaderProps, CascaderOption } from './index';

type UseLoadDataProps = {
    loadData: CascaderProps["loadData"];
    openChildren: (id: CascaderOption["id"], depth: number) => void;
}

export default ({
    loadData,
    openChildren,
}: UseLoadDataProps) => {
    const [loadingId, setLoadingId] = React.useState<string | number>(null);

    const startLoadData = (option, depth: number) => {
        if (!loadData) return;
        setLoadingId(option.id)
        loadData(option).then(data => {
            openChildren(option.id, depth);
        }).finally(() => {
            setLoadingId(null)
        })
    }

    return {
        loadingId,
        startLoadData
    }
}