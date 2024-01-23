import { CascaderProps } from './index';
export type ExpandIconProps = {
    hasChildren: boolean;
    isLoading: boolean;
    openChildren: () => void;
    startLoadData: () => void;
    loadData: CascaderProps["loadData"];
};
declare const _default: ({ hasChildren, isLoading, openChildren, startLoadData, loadData, }: ExpandIconProps) => import("react/jsx-runtime").JSX.Element;
export default _default;
