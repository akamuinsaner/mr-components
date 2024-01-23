import { TreeSelectOption } from './index';
export type CheckProps = {
    show: boolean;
    selected: Array<TreeSelectOption["id"]>;
    option: TreeSelectOption;
    allChildrenMap: Map<number | string, TreeSelectOption[]>;
    setSelected: (s: Array<TreeSelectOption["id"]>) => void;
};
declare const _default: ({ show, option, selected, setSelected, allChildrenMap }: CheckProps) => import("react/jsx-runtime").JSX.Element;
export default _default;
