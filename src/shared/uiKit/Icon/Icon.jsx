import React from 'react';
import styles from './Icon.module.scss';


const SIZE_MAP = {
    xxs: 12,
    xs: 16,
    s: 20,
    m: 24,
    l: 28,
    xl: 32
};

export const Icon = ({
    size = 'xs',
    children,
    color,
    fill = 'none'
}) => {
    const sizeValue = SIZE_MAP[size] || SIZE_MAP.xs
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
                // display: 'flex',
                // alignItems: 'center',
                // justifyContent: 'center',
                // flexShrink: 0
            }}
        >
            {children}
        </svg>
    );
};