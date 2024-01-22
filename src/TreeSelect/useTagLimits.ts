import React from 'react';
import { UseTagLimitsProps } from './types';

export default ({
    maxTagCount,
    selected,
    inputRef,
}: UseTagLimitsProps) => {
    const [tagWidths, setTagWidths] = React.useState([]);
    const [tagLimit, setTagLimit] = React.useState<number>(10000);

    const calculateTagLimit = () => {
        const inputWidth = inputRef.current.offsetWidth;
        let width = 0;
        for (let i = 0; i < tagWidths.length;) {
            width += tagWidths[0];
            if (inputWidth - width < 150) {
                setTagLimit(i + 1);
                break;
            } else {
                i++;
            }
        }
    };

    React.useEffect(() => {
        if (typeof maxTagCount === 'number') setTagLimit(maxTagCount || 10000);
        if (maxTagCount === 'responsive') {
            setTagLimit(10000);
            calculateTagLimit();
            window.addEventListener('resize', calculateTagLimit);
        }
        return () => {
            window.removeEventListener('resize', calculateTagLimit);
        }
    }, [maxTagCount, tagWidths, selected]);

    return {
        tagLimit,
        tagWidths,
        setTagWidths
    }
}
