import React from 'react';
import { CascaderOption } from './index';
import { DataSet } from '../utils/getTreeDataFormatted';

type UseSearchProps = {
    search: boolean;
    multiple: boolean;
    dataSet: DataSet<CascaderOption>;
}

export default ({
    search,
    multiple,
    dataSet
}: UseSearchProps) => {
    const { idChildrenMap, flattedData } = dataSet;
    const [inputValue, setInputValue] = React.useState<string>('');
    const [searchData, setSearchData] = React.useState<CascaderOption[]>(flattedData);

    const filterOptionsByInput = (options: CascaderOption[]) => {
        let filteredIds = [];
        for (let [key, list] of idChildrenMap.entries()) {
            const filteredByInput = !!list.find(l => `${l.name}`.includes(inputValue));
            if (filteredByInput) filteredIds.push(key);
        }
        const filterCondition: (o: CascaderOption) => boolean
            = o => filteredIds.includes(o.id) || `${o.name}`.indexOf(inputValue) > -1;
        return options.filter(filterCondition);
    }

    const onInputChange = (e, value, reason) => {
        if (reason === 'reset' && multiple) return;
        setInputValue(value);
    };

    React.useEffect(() => {
        if (search) setSearchData(filterOptionsByInput(flattedData));
    }, [inputValue, search]);

    React.useEffect(() => {
        setSearchData(flattedData);
    }, [dataSet]);

    return {
        inputValue,
        onInputChange,
        searchData
    }
}