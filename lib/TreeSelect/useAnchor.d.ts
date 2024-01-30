import React from 'react';
type UseAnchorProps = {
    onInputChange: (e: any, value: any, reason: string) => void;
};
declare const _default: ({ onInputChange }: UseAnchorProps) => {
    eleRef: React.MutableRefObject<HTMLElement>;
    inputRef: React.MutableRefObject<any>;
    anchorEl: HTMLElement;
    openDropDown: (e: any) => void;
    hovering: boolean;
    setHovering: React.Dispatch<React.SetStateAction<boolean>>;
};
export default _default;
