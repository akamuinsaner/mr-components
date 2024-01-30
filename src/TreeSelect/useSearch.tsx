import React from 'react';
import { TreeSelectOption } from './index';
import { DataSet } from '../utils/getTreeDataFormatted';

type UseSearchProps = {
    multiple: boolean;
    dataSet: DataSet<TreeSelectOption>;
}

export default ({
    multiple,
    dataSet
}: UseSearchProps) => {
    const { idChildrenMap } = dataSet;
    const [inputValue, setInputValue] = React.useState<string>('');

    const filterOptionsByInput = (options: TreeSelectOption[]) => {
        let filteredIds = [];
        for (let [key, list] of idChildrenMap.entries()) {
            const filteredByInput = !!list.find(l => `${l.name}`.includes(inputValue));
            if (filteredByInput) filteredIds.push(key);
        }
        const filterCondition: (o: TreeSelectOption) => boolean
            = o => filteredIds.includes(o.id) || `${o.name}`.indexOf(inputValue) > -1;
        return options.filter(filterCondition);
    }

    const onInputChange = (e, value, reason) => {
        if (reason === 'reset' && multiple) return;
        setInputValue(value);
    };

    return {
        inputValue,
        onInputChange,
        filterOptionsByInput
    }
}