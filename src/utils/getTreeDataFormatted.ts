import React from "react";
import { v4 as uuidV4 } from 'uuid';

export type BaseTreeData<T> = {
    id: string | number;
    name: string | number | React.ReactNode;
    parentId?: BaseTreeData<T>["id"];
    children?: T[];
}

export type DataSet<T extends BaseTreeData<T>> = {
    flattedData: T[];
    idTreeNodeMap: Map<BaseTreeData<T>["id"], T>,
    idChildrenMap: Map<T["id"], T[]>,
    idChildrenIdMap: Map<T["id"], (T["id"])[]>;
    parentChainMap: Map<T["id"], (T["id"])[]>;
    idSiblingsMap: Map<T["id"], T[]>;
    idSiblingsAfterMap: Map<T["id"], T[]>
}

export const initialDataSet = {
    flattedData: [],
    idTreeNodeMap: new Map(),
    idChildrenMap: new Map(),
    idChildrenIdMap: new Map(),
    parentChainMap: new Map(),
    idSiblingsMap: new Map(),
    idSiblingsAfterMap: new Map(),
}

export const RESERVED_KEY = uuidV4();

const getTreeDataFormatted = <T extends BaseTreeData<T>>(
    options: T[],
    flattedData = [],
    idTreeNodeMap: Map<BaseTreeData<T>["id"], T> = new Map(),
    idChildrenMap: Map<BaseTreeData<T>["id"], T[]> = new Map(),
    idChildrenIdMap: Map<BaseTreeData<T>["id"], (BaseTreeData<T>["id"])[]> = new Map(),
    parentChainMap: Map<BaseTreeData<T>["id"], (BaseTreeData<T>["id"])[]> = new Map(),
    idSiblingsMap: Map<BaseTreeData<T>["id"], T[]> = new Map(),
    idSiblingsAfterMap: Map<BaseTreeData<T>["id"], T[]> = new Map(),
    parentId: BaseTreeData<T>["parentId"] = RESERVED_KEY,
    curParentChain: (BaseTreeData<T>["id"])[] = []
): DataSet<T> => {
    options.forEach((item, index) => {
        /*****flatted data*****/
        flattedData.push({ ...item, parentId });

        idTreeNodeMap.set(item.id, item);

        /*****parent chain data*****/
        const parentChain = [...curParentChain]
        if (parentId !== RESERVED_KEY)  parentChain.unshift(parentId);
        parentChainMap.set(item.id, parentChain);

        /*****id children data*****/
        idChildrenMap.set(item.id, []);
        idChildrenIdMap.set(item.id, []);
        parentChain.forEach(id => {
            idChildrenMap.get(id).push(item);
            idChildrenIdMap.get(id).push(item.id)
        })

        /*****id sibling data*****/
        const siblings = [...options];
        siblings.splice(index, 1);
        idSiblingsMap.set(item.id, siblings);

        /*****id sibling after*****/
        const afterSiblings = [...options];
        afterSiblings.splice(0, index + 1);
        idSiblingsAfterMap.set(item.id, afterSiblings);

        const hasChildren = !!(item.children && item.children.length);
        if (hasChildren) {
            getTreeDataFormatted(
                item.children,
                flattedData,
                idTreeNodeMap,
                idChildrenMap,
                idChildrenIdMap,
                parentChainMap,
                idSiblingsMap,
                idSiblingsAfterMap,
                item.id,
                parentChain
            );
        }
    });
    return {
        flattedData,
        idTreeNodeMap,
        idChildrenMap,
        idChildrenIdMap,
        parentChainMap,
        idSiblingsMap,
        idSiblingsAfterMap
    };
}

export default getTreeDataFormatted;
