import { TreeSelectOption } from './index';
import { DataSet } from '../utils/getTreeDataFormatted';
export type CheckProps = {
    show: boolean;
    selected: Array<TreeSelectOption["id"]>;
    option: TreeSelectOption;
    setSelected: (s: Array<TreeSelectOption["id"]>) => void;
    parentChainMap: DataSet<TreeSelectOption>["parentChainMap"];
    idChildrenIdMap: DataSet<TreeSelectOption>["idChildrenIdMap"];
    checkWithRelation: boolean;
};
declare const _default: ({ show, option, selected, setSelected, parentChainMap, idChildrenIdMap, checkWithRelation }: CheckProps) => import("react/jsx-runtime").JSX.Element;
export default _default;
