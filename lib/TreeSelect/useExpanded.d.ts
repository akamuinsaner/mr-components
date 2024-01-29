import { TreeSelectOption, TreeSelectProp } from './index';
import { DataSet } from '../utils/getTreeDataFormatted';
type UseExpandedProps = {
    flattedData: DataSet<TreeSelectOption>["flattedData"];
    defaultExpandAll: TreeSelectProp["defaultExpandAll"];
    defaultExpandedKeys: TreeSelectProp["defaultExpandedKeys"];
    expandedKeys: TreeSelectProp["expandedKeys"];
    onExpand: TreeSelectProp["onExpand"];
};
declare const _default: ({ flattedData, defaultExpandAll, defaultExpandedKeys, expandedKeys, onExpand }: UseExpandedProps) => {
    expandKeys: (string | number)[];
    toggleExpand: (id: TreeSelectOption["id"]) => void;
};
export default _default;
