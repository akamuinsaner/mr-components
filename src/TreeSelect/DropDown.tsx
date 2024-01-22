import React from 'react';
import Popper from '@mui/material/Popper';
import { DropDownProps } from './types';

export default ({
    anchorEl,
    placement,
    initialWidth,
    popperStyle,
    popperClassName,
    children,
}: DropDownProps) => {
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