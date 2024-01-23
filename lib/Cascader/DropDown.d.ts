import React from 'react';
import { CascaderProps } from './index';
export type DropDownProps = {
    anchorEl: HTMLElement;
    popperStyle: CascaderProps["popperStyle"];
    popperClassName: CascaderProps["popperClassName"];
    children: React.ReactNode;
    depth: number;
};
declare const _default: ({ depth, anchorEl, popperStyle, popperClassName, children, }: DropDownProps) => import("react/jsx-runtime").JSX.Element;
export default _default;
