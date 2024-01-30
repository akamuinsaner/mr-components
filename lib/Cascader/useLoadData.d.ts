import { CascaderProps, CascaderOption } from './index';
type UseLoadDataProps = {
    loadData: CascaderProps["loadData"];
    openChildren: (id: CascaderOption["id"], depth: number) => void;
};
declare const _default: ({ loadData, openChildren, }: UseLoadDataProps) => {
    loadingId: string | number;
    startLoadData: (option: any, depth: number) => void;
};
export default _default;
