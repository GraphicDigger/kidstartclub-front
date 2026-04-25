import React from 'react';
import styles from './Icon.module.scss';


const SIZE_MAP = {
    xs: 12,
    s: 16,
    m: 20,
    l: 24,
    xl: 28,
};

export const Icon = ({
    size = 'm',
    children,
    color,
    fill = 'none'
}) => {
    const sizeValue = SIZE_MAP[size] || SIZE_MAP.m
    const viewBox = `0 0 ${sizeValue} ${sizeValue}`

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={viewBox}
            fill={fill}
            width={sizeValue}
            height={sizeValue}
            className={styles.icon}
            style={{
                color: color || 'currentColor',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
            }}
        >
            {children}
        </svg>
    );
};