import React from 'react';
import Chip from '@mui/material/Chip';
import { TreeSelectOption } from './index';

export default ({
    option,
    onDelete,
    onInit
}: {
    option: TreeSelectOption;
    onDelete: (id: string | number) => void;
    onInit: (number) => void;
}) => {
    const ref = React.useRef(null);
    React.useEffect(() => {
        onInit(ref.current.offsetWidth)
    }, [])
    return (
        <Chip
            ref={ref}
            size='small'
            onDelete={() =>onDelete(option.id)}
            label={option?.name}
        />
    )
}