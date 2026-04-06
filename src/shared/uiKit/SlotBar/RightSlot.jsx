import React from 'react';
import styles from './RightSlot.module.css';

export const RightSlot = ({ children }) => {
    return (
        <div className={styles.rightSlot}>
            {children}
        </div>
    );
};
