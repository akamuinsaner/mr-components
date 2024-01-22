import React from "react";
export type BaseTreeData<T> = {
    id: string | number;
    name: string | number | React.ReactNode;
    parentId?: BaseTreeData<T>["id"];
    children?: T[];
};
export type DataSet<T extends BaseTreeData<T>> = {
    flattedData: T[];
    idTreeNodeMap: Map<BaseTreeData<T>["id"], T>;
    idChildrenMap: Map<T["id"], T[]>;
    idChildrenIdMap: Map<T["id"], (T["id"])[]>;
    parentChainMap: Map<T["id"], (T["id"])[]>;
    idSiblingsMap: Map<T["id"], T[]>;
    idSiblingsAfterMap: Map<T["id"], T[]>;
};
export declare const initialDataSet: {
    flattedData: any[];
    idTreeNodeMap: Map<any, any>;
    idChildrenMap: Map<any, any>;
    idChildrenIdMap: Map<any, any>;
    parentChainMap: Map<any, any>;
    idSiblingsMap: Map<any, any>;
    idSiblingsAfterMap: Map<any, any>;
};
export declare const RESERVED_KEY: any;
declare const getTreeDataFormatted: <T extends BaseTreeData<T>>(options: T[], flattedData?: any[], idTreeNodeMap?: Map<string | number, T>, idChildrenMap?: Map<string | number, T[]>, idChildrenIdMap?: Map<string | number, (string | number)[]>, parentChainMap?: Map<string | number, (string | number)[]>, idSiblingsMap?: Map<string | number, T[]>, idSiblingsAfterMap?: Map<string | number, T[]>, parentId?: string | number, curParentChain?: (string | number)[]) => DataSet<T>;
export default getTreeDataFormatted;
