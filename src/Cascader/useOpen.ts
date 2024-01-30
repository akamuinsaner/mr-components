import React from 'react';
import { RESERVED_KEY } from '../utils/getTreeDataFormatted';

export default () => {
    const [openKeys, setOpenKeys] = React.useState<any[]>([RESERVED_KEY]);

    const openChildren = (id, depth) => {
        const a = [...openKeys];
        a[depth] = id;
        setOpenKeys(a);
    }

    return {
        openKeys,
        openChildren,
    }
}