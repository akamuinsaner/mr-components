import React from 'react';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/ListItem';
import { TreeSelectProp, TreeSelectOption } from './index';
import Check from './Check';
import ExpandIcon from './ExpandIcon';
import { RESERVED_KEY, DataSet } from '../utils/getTreeDataFormatted';

export type OptionsProps = {
    dense: boolean;
    showCheck: boolean;
    selected: Array<TreeSelectOption["id"]>;
    multiple: TreeSelectProp["multiple"];
    loadData: TreeSelectProp["loadData"];
    expandKeys: Array<TreeSelectOption["id"]>;
    toggleExpand: (id: TreeSelectOption["id"]) => void;
    dataSet: DataSet<TreeSelectOption>;
    checkWithRelation: boolean;
    loadingId: TreeSelectOption["id"]
    startLoadData: (node: TreeSelectOption) => void;
    searchData: TreeSelectOption[];
    onSelect: (o: TreeSelectOption) => void;
    toggleCheck: (node: TreeSelectOption, checked: boolean) => void;
}

export default ({
    dense,
    showCheck,
    multiple,
    selected,
    loadData,
    expandKeys,
    toggleExpand,
    dataSet,
    checkWithRelation,
    loadingId,
    startLoadData,
    searchData,
    onSelect,
    toggleCheck,
}: OptionsProps) => {

    const {
        idChildrenIdMap,
        parentChainMap
    } = dataSet;

    const renderChildren = (
        id: number | string,
        depth: number,
        expand: boolean,
    ) => {
        if (!expand) return [];
        return renderTreeNode(id, depth);
    }

    const renderTreeNode = (parentId: TreeSelectOption["id"] = RESERVED_KEY, depth: number = 0) => {
        let currentLevelNodes = searchData.filter(o => o.parentId === parentId);
        return currentLevelNodes.map(node => {
            const nodeId = node.id;
            const itemSelected = selected.includes(nodeId);
            const hasChildren = !!(node.children && node.children.length);
            const showChildren = expandKeys.includes(nodeId);
            const isLoading = loadingId === nodeId;
            const visibility = hasChildren || !!loadData;
            const onExpandChange = () => toggleExpand(nodeId);
            return [
                <ListItem
                    key={nodeId}
                    sx={{
                        paddingLeft: `${depth * 20 + 16}px`,
                        cursor: 'pointer'
                    }}
                    dense={dense}
                    selected={itemSelected}
                    onClick={(e) => {
                        multiple && e.stopPropagation();
                        onSelect(node);
                    }}
                >
                    <ExpandIcon
                        hasChildren={hasChildren}
                        showChildren={showChildren}
                        isLoading={isLoading}
                        visibility={visibility}
                        onExpandChange={onExpandChange}
                        startLoadData={() => startLoadData(node)}
                    />
                    <Check
                        option={node}
                        show={showCheck}
                        selected={selected}
                        toggleCheck={toggleCheck}
                        parentChainMap={parentChainMap}
                        idChildrenIdMap={idChildrenIdMap}
                        checkWithRelation={checkWithRelation}

                    />
                    <Typography>{node.name}</Typography>
                </ListItem>,
                ...renderChildren(
                    nodeId,
                    depth + 1,
                    showChildren,
                )
            ]
        })
    };
    return <>
        {...renderTreeNode()}
    </>;
}