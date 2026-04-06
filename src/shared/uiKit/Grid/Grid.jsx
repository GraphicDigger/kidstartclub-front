'use client'
/** @jsxImportSource @emotion/react */
import React, { forwardRef } from 'react';
import classNames from 'classnames';
import styles from './Grid.module.scss';

export const Grid = ({
    
    width,
    gap = 0,
    autoFill = false,
    minCol = 320,
    // grid container
    container = false,
    columns = 12,
    // grid item
    item = false,
    span,

    children,
    className,
    ...props
}) => {

    const classes = classNames(
        styles.grid,
        container && styles[`grid-container`],
        item && styles[`grid-item`],
        className
    );

    const getGridTemplate = () => {
        if (container && !item) {
            if (autoFill) {
                return `repeat(auto-fill, minmax(${minCol}px, 1fr))`;
            } else {
                return `repeat(${columns}, 1fr)`;
            }
        }
        return undefined;
    };

    const style = {
        width: typeof width === 'number' ? `${width}px` : width,
        gridTemplateColumns: getGridTemplate(),
        gap: gap > 0 && typeof gap === 'number' ? `${gap * 4}px` : undefined,
        gridColumn: span && item ? `span ${span}` : undefined,
    };


    return (
        <div
            className={classes}
            style={style}
            {...props}
        >
            {children}
        </div>
    );
};
