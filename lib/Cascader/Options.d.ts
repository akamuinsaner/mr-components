import { CascaderOption, CascaderProps } from './index';
type Props = {
    dense: boolean;
    parentId: CascaderOption["id"];
    showCheck: boolean;
    inputValue: string;
    selected: Array<CascaderOption["id"]>;
    search: CascaderProps["search"];
    flatOptions: CascaderOption[];
    multiple: CascaderProps["multiple"];
    allChildrenMap: Map<number | string, CascaderOption[]>;
    setSelected: (s: Array<CascaderOption["id"]>) => void;
    loadData: CascaderProps["loadData"];
    setFlattedOptions: (f: CascaderOption[]) => void;
    openChildren: (id: CascaderOption["id"]) => void;
};
declare const _default: ({ dense, parentId, showCheck, search, multiple, selected, inputValue, flatOptions, setSelected, allChildrenMap, setFlattedOptions, loadData, openChildren }: Props) => any;
export default _default;
