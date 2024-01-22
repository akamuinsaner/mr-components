import React from 'react';
import Popper from '@mui/material/Popper';
import { DropDownProps } from './types';

export default ({
    depth,
    anchorEl,
    popperStyle,
    popperClassName,
    children,
}: DropDownProps,
) => {
    const open = !!anchorEl;
    const width = 240;
    const initialStyles = {
        width: `${width}px`,
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
            placement="bottom-start"
            modifiers={[{ name: 'offset', options: { offset: [depth * width, 0], }, }]}
        >
            {children}
        </Popper>
    )
}