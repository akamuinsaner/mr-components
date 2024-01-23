import { TreeSelectProp, TreeSelectOption } from './index';
export type OptionsProps = {
    dense: boolean;
    expandKeys: Array<TreeSelectOption["id"]>;
    expandAll: boolean;
    showCheck: boolean;
    inputValue: string;
    selected: Array<TreeSelectOption["id"]>;
    search: TreeSelectProp["search"];
    flatOptions: TreeSelectOption[];
    multiple: TreeSelectProp["multiple"];
    allChildrenMap: Map<number | string, TreeSelectOption[]>;
    setSelected: (s: Array<TreeSelectOption["id"]>) => void;
    loadData: TreeSelectProp["loadData"];
    setFlattedOptions: (f: TreeSelectOption[]) => void;
};
declare const _default: ({ dense, expandKeys, expandAll, showCheck, search, multiple, selected, inputValue, flatOptions, setSelected, allChildrenMap, setFlattedOptions, loadData }: OptionsProps) => any;
export default _default;
