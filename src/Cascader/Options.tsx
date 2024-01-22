import React from 'react';
import { OptionProps, CascaderOption } from './types';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/ListItem';
import ExpandIcon from './ExpandIcon';
import Check from '../TreeSelect/Check';

export default ({
    dense,
    parentId,
    showCheck,
    search,
    multiple,
    selected,
    inputValue,
    flatOptions,
    setSelected,
    allChildrenMap,
    setFlattedOptions,
    loadData,
    openChildren
}: OptionProps) => {
    const [loadingId, setLoadingId] = React.useState<string | number>(null);

    const onSelect = (o: CascaderOption) => {
        if (multiple) {
            if (selected.includes(o.id)) {
                setSelected(selected.filter(s => s !== o.id));
            } else {
                setSelected([...selected, o.id]);
            }
        } else {
            setSelected([o.id]);
        }
    };


    const startLoadData = (option) => {
        if (!loadData) return;
        setLoadingId(option.id)
        loadData(option).then(data => {
            setFlattedOptions(flatOptions
                .map(item => (item.id === option.id ? { ...item, children: data } : item))
                .concat(data.map(item => ({ ...item, parentId: option.id }))))
            openChildren(option.id);
        }).finally(() => {
            setLoadingId(null)
        })
    }

    const renderOptionItem = (option) => {
        const hasChildren = !!flatOptions.find(o => o.parentId === option.id);
        const itemSelected = selected.includes(option.id);
        const isLoading = loadingId === option.id;

        return (
            <ListItem
                key={option.id}
                dense={dense}
                sx={{
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}
                selected={itemSelected}
                secondaryAction={<ExpandIcon
                    loadData={loadData}
                    hasChildren={hasChildren}
                    isLoading={isLoading}
                    openChildren={() => openChildren(option.id)}
                    startLoadData={() => startLoadData(option)}
                />}
                onClick={(e) => {
                    multiple && e.stopPropagation();
                    onSelect(option);
                }}
            >
                <Check
                    option={option}
                    show={showCheck}
                    selected={selected}
                    setSelected={setSelected}
                    allChildrenMap={allChildrenMap}
                />
                <Typography>{option.name}</Typography>
            </ListItem>
        )
    }

    const filterOptionsByInput = (options: CascaderOption[]) => {
        let filteredIds = [];
        for (let [key, list] of allChildrenMap.entries()) {
            const filteredByInput = list
                .filter(l => (`${l.name}`)
                    .indexOf(inputValue) > -1);
            if (!!filteredByInput.length) filteredIds.push(key);
        }
        const filterCondition: (o: CascaderOption) => boolean
            = o => filteredIds.includes(o.id) || `${o.name}`.indexOf(inputValue) > -1;
        return options.filter(filterCondition);
    }

    const renderOptions = () => {
        let options = flatOptions.filter(o => o.parentId === parentId);
        if (search && inputValue) options = filterOptionsByInput(options);
        return options.map(o => renderOptionItem(o));
    };
    return renderOptions() as any;
}

