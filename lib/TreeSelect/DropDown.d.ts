import React from 'react';
import { TreeSelectProp } from './index';
export type DropDownProps = {
    anchorEl: HTMLElement;
    initialWidth: number;
    placement: TreeSelectProp["placement"];
    popperStyle: TreeSelectProp["popperStyle"];
    popperClassName: TreeSelectProp["popperClassName"];
    children: React.ReactNode;
};
declare const _default: ({ anchorEl, placement, initialWidth, popperStyle, popperClassName, children, }: DropDownProps) => import("react/jsx-runtime").JSX.Element;
export default _default;
