import React from 'react';

type UseScrollProps = {

}

export default () => {
    let scrollTimer: NodeJS.Timeout;
    const containerRef = React.useRef<HTMLElement>(null);
    const [scrollingInfo, setScrollingInfo] = React.useState<{
        scrollTop: boolean;
        scrollLeft: boolean;
        scrollRight: boolean;
    }>({
        scrollTop: false,
        scrollLeft: false,
        scrollRight: false,
    });
    const containerScrolling = () => {
        clearTimeout(scrollTimer);
        setTimeout(() => {
            const element = containerRef.current;
            const { scrollTop, scrollWidth, scrollLeft, clientWidth } = element;
            setScrollingInfo({
                scrollTop: scrollTop === 0,
                scrollLeft: scrollLeft === 0,
                scrollRight: scrollWidth === scrollLeft + clientWidth,
            })
        }, 300);
    }
    React.useEffect(() => {
        containerScrolling();
        if (containerRef.current) {
            containerRef.current.addEventListener('scroll', containerScrolling);
        }
        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener('scroll', containerScrolling);
            }
        }
    }, []);

    return {
        containerRef,
        scrollingInfo
    }
}