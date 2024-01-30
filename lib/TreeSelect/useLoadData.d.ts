import { TreeSelectProp, TreeSelectOption } from './index';
type UseLoadDataProps = {
    loadData: TreeSelectProp["loadData"];
    toggleExpand: (id: TreeSelectOption["id"]) => void;
};
declare const _default: ({ loadData, toggleExpand }: UseLoadDataProps) => {
    loadingId: string | number;
    startLoadData: (option: any) => void;
};
export default _default;
