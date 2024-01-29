import { TreeSelectProp, TreeSelectOption } from './index';
import { DataSet } from '../utils/getTreeDataFormatted';
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
};
declare const _default: ({ dense, showCheck, search, multiple, selected, inputValue, setSelected, loadData, expandKeys, toggleExpand, dataSet, checkWithRelation }: OptionsProps) => import("react/jsx-runtime").JSX.Element;
export default _default;
