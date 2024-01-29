import { TreeSelectProp, TreeSelectOption } from './index';
export type OptionsProps = {
    dense: boolean;
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
    expandKeys: Array<TreeSelectOption["id"]>;
    toggleExpand: (id: TreeSelectOption["id"]) => void;
};
declare const _default: ({ dense, showCheck, search, multiple, selected, inputValue, flatOptions, setSelected, allChildrenMap, setFlattedOptions, loadData, expandKeys, toggleExpand }: OptionsProps) => any;
export default _default;
