import React from 'react';
import { CascaderProps, CascaderOption } from './index';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/ListItem';
import ExpandIcon from './ExpandIcon';
import Check from '../TreeSelect/Check';
import { RESERVED_KEY, DataSet } from '../utils/getTreeDataFormatted';

export type OptionProps = {
    dense: boolean;
    parentId: CascaderOption["id"];
    showCheck: boolean;
    selected: Array<CascaderOption["id"]>;
    multiple: CascaderProps["multiple"];
    loadData: CascaderProps["loadData"];
    openChildren: (id: CascaderOption["id"], depth: number) => void;
    dataSet: DataSet<CascaderOption>;
    checkWithRelation: boolean;
    toggleCheck: (node: CascaderOption, checked: boolean) => void;
    searchData: CascaderOption[];
    onSelect: (o: CascaderOption) => void;
    startLoadData: (node: CascaderOption, depth: number) => void;
    depth: number;
    loadingId: CascaderOption["id"];
}

export default ({
    dense,
    parentId,
    showCheck,
    multiple,
    selected,
    loadData,
    openChildren,
    dataSet,
    checkWithRelation,
    toggleCheck,
    searchData,
    onSelect,
    startLoadData,
    depth,
    loadingId
}: OptionProps) => {

    const {
        idChildrenIdMap,
        parentChainMap
    } = dataSet;

    const renderOptionItem = (option) => {
        const hasChildren = !!(option.children && option.children.length);
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
                    openChildren={() => openChildren(option.id, depth + 1)}
                    startLoadData={() => startLoadData(option, depth + 1)}
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
                    toggleCheck={toggleCheck}
                    parentChainMap={parentChainMap}
                    idChildrenIdMap={idChildrenIdMap}
                    checkWithRelation={checkWithRelation}
                />
                <Typography>{option.name}</Typography>
            </ListItem>
        )
    }

    const renderOptions = () => {
        let currentLevelNodes = searchData.filter(o => o.parentId === parentId);
        return currentLevelNodes.map(o => renderOptionItem(o));
    };
    return renderOptions() as any;
}

