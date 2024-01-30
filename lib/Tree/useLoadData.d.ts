import { TreeData, TreeProps } from './index';
type UseLoadDataProps = {
    loadData: TreeProps["loadData"];
    toggleExpand: (node: TreeData, expand: boolean) => void;
};
declare const _default: ({ loadData, toggleExpand }: UseLoadDataProps) => {
    loadingId: string | number;
    startLoadData: (option: any) => void;
};
export default _default;
