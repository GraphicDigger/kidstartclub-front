'use client';
import React, { memo, forwardRef } from 'react';
import classNames from 'classnames';
import styles from './Stack.module.scss';

export const Stack = memo(forwardRef(({
    direction = 'column',
    align = 'center',
    justify = 'center',
    gap = 0,
    padding = 0,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    backgroundColor,
    width = 'fill', // fill(100%), fit(max-content), number(px)
    height = 'fill',
    wrap = false,

    children,
    onClick,
    className,
    css,
    zIndex,
    ...props
}, ref) => {

    const isNumeric = (value) => typeof value === 'number';
    const isColumn = direction === 'column';
    const finalAlign = isColumn ? justify : align;
    const finalJustify = isColumn ? align : justify;

    const stackClass = classNames(
        styles.stack,
        styles[`stack-${direction}`],
        styles[`stack-align-${finalAlign}`],
        styles[`stack-justify-${finalJustify}`],
        styles[`stack-gap-${gap}`],
        wrap && styles[`stack-wrap`],
        !isNumeric(width) && styles[`stack-width-${width}`],
        !isNumeric(height) && styles[`stack-height-${height}`],
        className
    );

    const style = {
        gap: typeof gap === 'number' ? `${gap * 4}px` : gap,
        padding: typeof padding === 'number' ? `${padding * 4}px` : padding,
        paddingTop: typeof paddingTop === 'number' ? `${paddingTop * 4}px` : paddingTop,
        paddingBottom: typeof paddingBottom === 'number' ? `${paddingBottom * 4}px` : paddingBottom,
        paddingLeft: typeof paddingLeft === 'number' ? `${paddingLeft * 4}px` : paddingLeft,
        paddingRight: typeof paddingRight === 'number' ? `${paddingRight * 4}px` : paddingRight,
        backgroundColor,
        zIndex,
        width: typeof width === 'number' && `${width}px`,
        height: typeof height === 'number' && `${height}px`,
        ...css,
    };

    const stackStyle = Object.fromEntries(
        Object.entries(style).filter(([_, value]) => value !== undefined && value !== null)
    );

    const handleClick = (e) => {
        if (onClick) {
            onClick(e);
        }
    };

    return (
        <div ref={ref}
            className={stackClass}
            style={stackStyle}
            onClick={handleClick}
            {...props}
        >
            {children}
        </div>
    );
}));
