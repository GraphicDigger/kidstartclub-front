
import React, { forwardRef } from 'react';
import classNames from 'classnames';
import styles from './Grid.module.scss';

/**
 * @param {{
 *   width?: any,
 *   gap?: number,
 *   autoFill?: boolean,
 *   autoFit?: boolean,
 *   minCol?: number,
 *   container?: boolean,
 *   columns?: number,
 *   item?: boolean,
 *   span?: any,
 *   children?: import('react').ReactNode,
 *   className?: string,
 *   [key: string]: any,
 * }} props
 */
export const Grid = ({
    width,
    gap = 0,
    autoFill = false,
    autoFit = false,
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
            } else if (autoFit) {
                return `repeat(auto-fit, minmax(${minCol}px, 1fr))`;
            } else {
                return `repeat(${columns}, 1fr)`;
            }
        }
        return undefined;
    };

    const style = {
        width: typeof width === 'number' ? `${width}px` : "100%",
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
