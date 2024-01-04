import React from 'react';
import Chip from '@mui/material/Chip';
import { TreeSelectOption } from './index';
import { TextFieldProps, ChipProps } from '@mui/material';

export default ({
    size,
    option,
    onDelete,
    onInit
}: {
    size: ChipProps["size"];
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
            size={size}
            onDelete={() =>onDelete(option.id)}
            label={option?.name}
        />
    )
}