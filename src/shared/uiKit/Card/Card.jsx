'use client';
import React, { memo, forwardRef } from 'react';
import classNames from 'classnames';
import styles from './Card.module.scss';
import { Stack } from '../Stack';
import { getHeight, getWidth } from './lib';

export const Card = memo(forwardRef(({
    children,
    onClick,
    className,
    css,
    aspectRatio,
    height,
    width = 'fill',
    ...props
}, ref) => {

    const classes = classNames(
        styles.card,
        className
    );

    const style = {
        aspectRatio: aspectRatio ? `${aspectRatio}` : undefined,
        height: getHeight(height),
        width: getWidth(width),
    }

    const handleClick = (e) => {
        if (onClick) {
            onClick(e);
        }
    };

    return (
        <div
            className={classes}
            style={style}
            onClick={handleClick}
        >
            {children}
        </div>
    );
}));

