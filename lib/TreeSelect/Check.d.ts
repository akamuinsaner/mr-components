import { TreeSelectOption } from './index';
type Props = {
    show: boolean;
    selected: Array<TreeSelectOption["id"]>;
    option: TreeSelectOption;
    allChildrenMap: Map<number | string, TreeSelectOption[]>;
    setSelected: (s: Array<TreeSelectOption["id"]>) => void;
};
declare const _default: ({ show, option, selected, setSelected, allChildrenMap }: Props) => import("react/jsx-runtime").JSX.Element;
export default _default;
