import React from 'react';
export type UseTagLimitsProps = {
    maxTagCount?: number | 'responsive';
    selected: Array<string | number>;
    inputRef: React.MutableRefObject<any>;
};
declare const _default: ({ maxTagCount, selected, inputRef, }: UseTagLimitsProps) => {
    tagLimit: number;
    tagWidths: any[];
    setTagWidths: React.Dispatch<React.SetStateAction<any[]>>;
};
export default _default;
