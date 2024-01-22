import React from 'react';
import { Stack } from '@mui/material';
import TreeNode from './treeNode';
import styles from './index.module.css';
import getTreeDataFormatted, {
    RESERVED_KEY,
} from '../utils/getTreeDataFormatted';
import { DataSet } from '../utils/getTreeDataFormatted';
import {
    DndContext,
    useSensor,
    useSensors,
    PointerSensor,
} from '@dnd-kit/core';
import classNames from 'classnames';
import { TreeData, TreeProps } from './types';
import useChecked from './useChecked';
import useExpanded from './useExpanded';
import useSelected from './useSelected';
import useDnd from './useDnd';

const Tree = ({
    blockNodes,
    checkable,
    checkedKeys,
    checkWithRelation,
    className,
    defaultCheckedKeys,
    defaultCheckedAll,
    defaultExpandedKeys,
    defaultExpandAll,
    defaultSelectedKeys,
    defaultSelectAll,
    draggable,
    expandedKeys,
    onCheck,
    onExpand,
    onDrop,
    onSelect,
    selectedKeys,
    showLine,
    switchIcon,
    sx,
    treeData
}: TreeProps) => {
    const initializedRef = React.useRef<boolean>(false);
    const [dataSet, setDataSet] = React.useState<DataSet<TreeData>>(getTreeDataFormatted(treeData));

    React.useEffect(() => {
        if (!initializedRef.current) initializedRef.current = true;
        else setDataSet(getTreeDataFormatted(treeData));
    }, [treeData]);

    const { flattedData, idChildrenIdMap, parentChainMap, idSiblingsAfterMap } = dataSet;

    const { checkKeys, toggleCheck } = useChecked({
        dataSet,
        checkedKeys,
        checkWithRelation,
        defaultCheckedKeys,
        defaultCheckedAll,
        onCheck,
    });

    const { expandKeys, toggleExpand } = useExpanded({
        dataSet,
        defaultExpandedKeys,
        defaultExpandAll,
        expandedKeys,
        onExpand,
    });

    const { selectKeys, toggleSelect } = useSelected({
        dataSet,
        defaultSelectedKeys,
        defaultSelectAll,
        selectedKeys,
        onSelect,
    });

    const { activeId, overId, onDragStart, onDragOver, onDragEnd } = useDnd({
        dataSet,
        toggleExpand,
        onDrop
    });

    const renderChildren = (
        id: number | string,
        depth: number,
        expand: boolean,
    ) => {
        if (!expand) return [];
        return renderTreeNode(id, depth);
    }

    const renderTreeNode = (parentId: string | number = RESERVED_KEY, depth: number = 0) => {
        const curLevelNodes = flattedData.filter(o => o.parentId === parentId);
        if (!curLevelNodes.length) return []
        return curLevelNodes.map(node => {
            const nodeId = node.id;
            const expand = expandKeys.includes(nodeId);
            const checked = checkKeys.includes(node.id);
            const allChildrenIds = idChildrenIdMap.get(node.id);
            const indeterminate = !!allChildrenIds.find(id => checkKeys.includes(id))
                && !checked
                && checkWithRelation;
            const selected = selectKeys.includes(nodeId);
            const parentChain = parentChainMap.get(node.id);
            return [
                <TreeNode
                    blockNodes={blockNodes}
                    key={nodeId}
                    data={node}
                    depth={depth}
                    checkable={checkable}
                    expand={expand}
                    toggleExpand={toggleExpand}
                    checked={checked}
                    indeterminate={indeterminate}
                    toggleCheck={toggleCheck}
                    selected={selected}
                    toggleSelect={toggleSelect}
                    showLine={showLine}
                    idSiblingsAfterMap={idSiblingsAfterMap}
                    parentChain={parentChain}
                    switchIcon={switchIcon}
                    draggable={draggable}
                    activeId={activeId}
                    overId={overId}
                />,
                ...renderChildren(
                    nodeId,
                    depth + 1,
                    expand,
                )
            ]
        })
    }

    const render = (
        <Stack
            direction="column"
            className={classNames(styles["mr-tree"], className)}
            sx={sx}
        >
            {...renderTreeNode()}
        </Stack>
    )

    if (draggable) {
        return (
            <DndContext
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
                sensors={useSensors(
                    useSensor(PointerSensor, {
                        activationConstraint: {
                            distance: 10
                        }
                    })
                )}
            >
                {render}
            </DndContext>
        )
    }

    return render;
}

export default Tree;
