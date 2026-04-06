'use client'
import { useEffect, useRef } from 'react';
import styles from './Scrolling.module.scss';
import classNames from 'classnames';


export const Scrolling = ({
    children,
    spacingTop = 30,
    spacingBottom = 30,
    width = 'fill',
    height = 'fill',
    start = 'top',
    className,
}) => {

    const scrollableGridRef = useRef(null);

    useEffect(() => {
        if (scrollableGridRef.current) {
            if (start === 'top') {
                scrollableGridRef.current.scrollTop = 0;
            } else {
                scrollableGridRef.current.scrollTop = scrollableGridRef.current.scrollHeight;
            }
        }
    }, []);

    const classes = classNames(
        styles.scrolling,
        className
    );

    const getWidth = (width) => {
        if (typeof width === 'number') { return `${width}px` }
        if (width === 'fill') { return '100%' }
        if (width === 'fit') { return 'max-content' }
        return width;
    }

    const getHeight = (height) => {
        if (typeof height === 'number') { return `${height}px` }
        if (height === 'fill') { return '100%' }
        if (height === 'fit') { return 'max-content' }
        return height;
    }

    const style = {
        paddingTop: typeof spacingTop === 'number' ? `${spacingTop}px` : spacingTop,
        paddingBottom: typeof spacingBottom === 'number' ? `${spacingBottom}px` : spacingBottom,
        width: getWidth(width),
        height: getHeight(height),
    }

    return (
        <div
            className={classes}
            ref={scrollableGridRef}
            style={style}
        >
            {children}
        </div>
    );
};

