import React from 'react';
import styles from './Icon.module.scss';


export const SIZE_MAP = {
    xs: 12,
    s: 16,
    m: 20,
    l: 24,
    xl: 28,
};

export const Icon = ({
    size,
    children,
    color,
    fill = 'none'
}) => {
    const sizeValue = size == null ? undefined : typeof size === 'number' ? size : SIZE_MAP[size] ?? (isNaN(Number(size)) ? undefined : Number(size))
    const viewBox = sizeValue ? `0 0 ${sizeValue} ${sizeValue}` : undefined

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