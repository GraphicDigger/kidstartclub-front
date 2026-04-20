'use client';
import React, { forwardRef } from 'react';
import classNames from 'classnames';
import styles from './Stack.module.scss';


interface StackProps {
    direction?: 'column' | 'row';

    alignX?: 'start' | 'center' | 'end' | 'between';
    alignY?: 'start' | 'center' | 'end' | 'between';

    gap?: number;
    padding?: number;
    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;

    backgroundColor?: string;
    width?: 'fill' | 'fit' | number | 'full';
    height?: 'fill' | 'fit' | number | 'full';
    maxWidth?: 'fill' | 'fit' | number | 'full';

    wrap?: boolean;
    overflow?: 'visible' | 'hidden' | 'scroll';

    children?: React.ReactNode;
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
    zIndex?: number;
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(({
    direction = 'column',

    alignX = 'center',
    alignY = 'center',

    gap = 0,
    padding = 0,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,

    backgroundColor,
    width = 'fill',
    height = 'fill',
    maxWidth = 'fill',

    wrap = false,
    overflow = 'visible',

    children,
    onClick,
    className,
    style,
    zIndex,
    ...props
}, ref) => {

    const isNumeric = (value) => typeof value === 'number';
    const isColumn = direction === 'column';

    // 🔥 главное место
    const alignItems = isColumn ? alignX : alignY;
    const justifyContent = isColumn ? alignY : alignX;

    const stackClass = classNames(
        styles.stack,
        styles[`stack-${direction}`],
        styles[`stack-align-${alignItems}`],
        styles[`stack-justify-${justifyContent}`],
        styles[`stack-gap-${gap}`],
        wrap && styles.stackWrap,
        !isNumeric(width) && styles[`stack-width-${width}`],
        !isNumeric(height) && styles[`stack-height-${height}`],
        className
    );

    const inlineStyle = {
        gap: typeof gap === 'number' ? `${gap * 4}px` : gap,

        padding: typeof padding === 'number' ? `${padding * 4}px` : padding,
        paddingTop: typeof paddingTop === 'number' ? `${paddingTop * 4}px` : paddingTop,
        paddingBottom: typeof paddingBottom === 'number' ? `${paddingBottom * 4}px` : paddingBottom,
        paddingLeft: typeof paddingLeft === 'number' ? `${paddingLeft * 4}px` : paddingLeft,
        paddingRight: typeof paddingRight === 'number' ? `${paddingRight * 4}px` : paddingRight,

        backgroundColor,
        zIndex,

        width: typeof width === 'number' ? `${width}px` : width === 'full' ? '100vw' : width,
        height: typeof height === 'number' ? `${height}px` : height === 'full' ? '100vh' : height,
        maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,

        overflow,
        ...style,
    };

    const stackStyle = Object.fromEntries(
        Object.entries(inlineStyle).filter(([_, v]) => v != null)
    );

    return (
        <div
            ref={ref}
            className={stackClass}
            style={stackStyle}
            onClick={onClick}
            {...props}
        >
            {children}
        </div>
    );
});