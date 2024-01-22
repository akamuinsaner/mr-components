import React from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CircularProgress from '@mui/material/CircularProgress';
import { ExpandIconProps } from './types';

export default ({
    hasChildren,
    isLoading,
    openChildren,
    startLoadData,
    loadData,
}: ExpandIconProps) => {
    if (isLoading) {
        return <CircularProgress
            size={20}
            sx={{ marginRight: '4px' }}
            onClick={e => e.stopPropagation()}
        />
    }
    if (!hasChildren && !loadData) return;
    return <ArrowRightIcon
        sx={{ cursor: 'pointer' }}
        onClick={(e) => {
            e.stopPropagation()
            if (hasChildren) openChildren();
            startLoadData()
        }}
    />
}