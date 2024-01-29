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
    inputValue: string;
    selected: Array<TreeSelectOption["id"]>;
    search: TreeSelectProp["search"];
    multiple: TreeSelectProp["multiple"];
    setSelected: (s: Array<TreeSelectOption["id"]>) => void;
    loadData: TreeSelectProp["loadData"];
    expandKeys: Array<TreeSelectOption["id"]>;
    toggleExpand: (id: TreeSelectOption["id"]) => void;
    dataSet: DataSet<TreeSelectOption>;
    checkWithRelation: boolean;
}

export default ({
    dense,
    showCheck,
    search,
    multiple,
    selected,
    inputValue,
    setSelected,
    loadData,
    expandKeys,
    toggleExpand,
    dataSet,
    checkWithRelation
}: OptionsProps) => {
    const [loadingId, setLoadingId] = React.useState<string | number>(null);
    const {
        flattedData,
        idChildrenMap,
        idChildrenIdMap,
        idTreeNodeMap,
        parentChainMap
    } = dataSet;
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

    const onSelect = (o: TreeSelectOption) => {
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
            toggleExpand(option.id);
        }).finally(() => {
            setLoadingId(null)
        })
    }

    const renderChildren = (
        id: number | string,
        depth: number,
        expand: boolean,
    ) => {
        if (!expand) return [];
        return renderTreeNode(id, depth);
    }

    const renderTreeNode = (parentId: TreeSelectOption["id"] = RESERVED_KEY, depth: number = 0) => {
        let currentLevelNodes = flattedData.filter(o => o.parentId === parentId);
        if (search && inputValue) currentLevelNodes = filterOptionsByInput(currentLevelNodes);
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
                        setSelected={setSelected}
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