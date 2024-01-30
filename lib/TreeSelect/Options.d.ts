import { TreeSelectProp, TreeSelectOption } from './index';
import { DataSet } from '../utils/getTreeDataFormatted';
export type OptionsProps = {
    dense: boolean;
    showCheck: boolean;
    selected: Array<TreeSelectOption["id"]>;
    multiple: TreeSelectProp["multiple"];
    setSelected: (s: Array<TreeSelectOption["id"]>) => void;
    loadData: TreeSelectProp["loadData"];
    expandKeys: Array<TreeSelectOption["id"]>;
    toggleExpand: (id: TreeSelectOption["id"]) => void;
    dataSet: DataSet<TreeSelectOption>;
    checkWithRelation: boolean;
    loadingId: TreeSelectOption["id"];
    startLoadData: (node: TreeSelectOption) => void;
    searchData: TreeSelectOption[];
};
declare const _default: ({ dense, showCheck, multiple, selected, setSelected, loadData, expandKeys, toggleExpand, dataSet, checkWithRelation, loadingId, startLoadData, searchData }: OptionsProps) => import("react/jsx-runtime").JSX.Element;
export default _default;
