import { CascaderProps } from './index';
type Props = {
    hasChildren: boolean;
    isLoading: boolean;
    openChildren: () => void;
    startLoadData: () => void;
    loadData: CascaderProps["loadData"];
};
declare const _default: ({ hasChildren, isLoading, openChildren, startLoadData, loadData, }: Props) => import("react/jsx-runtime").JSX.Element;
export default _default;
