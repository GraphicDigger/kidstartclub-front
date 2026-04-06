import React from 'react';
import styles from './LeftSlot.module.css';

export const LeftSlot = ({
    children,
    paddingLeft = 4,
    gap = 4
}) => {
    return (
        <div
            className={styles.leftSlot}

            style={{
                paddingLeft: `${paddingLeft * 4}px`,
                gap: `${gap * 4}px`
            }}
        >
            {children}
        </div>
    );
};
