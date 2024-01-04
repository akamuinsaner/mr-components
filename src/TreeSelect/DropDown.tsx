import React from 'react';
import Popper from '@mui/material/Popper';
import { TreeSelectProp } from './index';

type Props = {
    anchorEl: HTMLElement;
    initialWidth: number;
    placement: TreeSelectProp["placement"];
    popperStyle: TreeSelectProp["popperStyle"];
    popperClassName: TreeSelectProp["popperClassName"];
    children: React.ReactNode
}

export default ({
    anchorEl,
    placement,
    initialWidth,
    popperStyle,
    popperClassName,
    children,
}: Props) => {
    if (!initialWidth) return;
    const open = !!anchorEl;
    const initialStyles = {
        minWidth: '200px',
        width: initialWidth,
        zIndex: 10000,
        background: '#fff',
        boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)'
    }

    return (
        <Popper
            slot='Paper'
            className={popperClassName}
            style={popperStyle}
            sx={initialStyles}
            open={open}
            anchorEl={anchorEl}
            placement={placement}
        >
            {children}
        </Popper>
    )
}