import React from 'react';

type UseAnchorProps = {
    onInputChange: (e: any, value: any, reason: string) => void;
}

export default ({
    onInputChange
}: UseAnchorProps) => {
    const inputRef = React.useRef(null);
    const eleRef = React.useRef<HTMLElement>(null);
    const [hovering, setHovering] = React.useState<boolean>(false)
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement>(null);

    const openDropDown = (e) => {
        e.stopPropagation();
        onInputChange(null, '', '');
        setAnchorEl(inputRef.current);
    };
    const closeOptions = (e) => {
        onInputChange(null, '', '');
        setAnchorEl(null);
        document.removeEventListener('click', closeOptions);
    };

    React.useEffect(() => {
        if (anchorEl) setTimeout(() => {
            document.addEventListener('click', closeOptions)
        }, 300);
    }, [anchorEl])

    return {
        eleRef,
        inputRef,
        anchorEl,
        openDropDown,
        hovering,
        setHovering
    }
}