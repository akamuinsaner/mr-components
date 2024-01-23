import React from 'react';
import { TreeData } from './index';
import { DataSet } from '../utils/getTreeDataFormatted';

export type UseDndProps = {
    dataSet:  DataSet<TreeData>;
    toggleExpand: (node: TreeData, expand: boolean) => void;
    onDrop: (active: TreeData, over: TreeData) => void;
}

export default ({
    dataSet,
    toggleExpand,
    onDrop
}: UseDndProps) => {
    const overTimer = React.useRef<NodeJS.Timeout>(null);
    const [activeId, setActiveId] = React.useState<any>(null);
    const [overId, setOverId] = React.useState<any>(null);

    const { idTreeNodeMap } = dataSet;

    React.useEffect(() => {
        if (activeId) toggleExpand(idTreeNodeMap.get(activeId), false);
    }, [activeId]);

    React.useEffect(() => {
        clearTimeout(overTimer.current);
        if (overId) {
            const node = idTreeNodeMap.get(overId);
            if (!node) return;
            const hasChildren = node.children && node.children.length;
            if (hasChildren) setTimeout(() => {
                toggleExpand(node, true);
            }, 500);
        }
    }, [overId]);

    const onDragEnd = e => {
        setActiveId(null);
        setOverId(null);
        let { over, active } = e;
        if (!over) return;
        if (active.id === over.id) return;
        if (onDrop) {
            onDrop(active, over);
            return;
        }
    }
    const onDragStart = e => {
        setActiveId(e.active.id);
    };
    const onDragOver = e => {
        if (e.over) setOverId(e.over.id);
    }

    return {
        activeId,
        overId,
        onDragStart,
        onDragOver,
        onDragEnd
    }
}