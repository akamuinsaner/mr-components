import React from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CircularProgress from '@mui/material/CircularProgress';

export type ExpandIconProps = {
    showChildren: boolean;
    hasChildren: boolean;
    isLoading: boolean;
    visibility: boolean;
    toggleOpen: (o: boolean) => void;
    startLoadData: () => void;
}

export default ({
    showChildren,
    hasChildren,
    isLoading,
    visibility,
    toggleOpen,
    startLoadData,
}: ExpandIconProps) => {
    if (showChildren) {
        return <ArrowDropDownIcon
            sx={{ opacity: visibility ? 1 : 0 }}
            onClick={(e) => {
                e.stopPropagation()
                if (!visibility) return;
                toggleOpen(false);
            }}
        />
    }
    if (isLoading) {
        return <CircularProgress
            size={20}
            sx={{ marginRight: '4px' }}
            onClick={e => e.stopPropagation()}
        />
    }
    return <ArrowRightIcon
        sx={{ opacity: visibility ? 1 : 0 }}
        onClick={(e) => {
            e.stopPropagation()
            if (!visibility) return;
            if (hasChildren) toggleOpen(true);
            startLoadData()
        }}
    />
}