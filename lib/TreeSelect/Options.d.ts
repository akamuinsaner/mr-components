import { TreeSelectProp, TreeSelectOption } from './index';
type Props = {
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
declare const _default: ({ expandKeys, expandAll, showCheck, search, multiple, selected, inputValue, flatOptions, setSelected, allChildrenMap, setFlattedOptions, loadData }: Props) => any;
export default _default;
