'use client'
/** @jsxImportSource @emotion/react */
import React, { forwardRef } from 'react';
import classNames from 'classnames';
import styles from './Text.module.scss';

export const Text = ({
    size = 'medium',
    color = 'primary',
    className,
    children,
    css
}) => {

    const classes = classNames(
        styles.text,
        styles[`text-${size}`],
        styles[`text-color-${color}`],
        className
    );

    const style = {
        ...css,
        color: styles[`text-color-${color}`]
    };

    return (
        <p
            className={classes}
            style={style}
        >
            {children}
        </p>
    );
};

