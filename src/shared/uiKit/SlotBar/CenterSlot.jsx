import React from 'react';
import styles from './CenterSlot.module.css';

export const CenterSlot = ({ children }) => {
    return (
        <div className={styles.centerSlot}>
            {children}
        </div>
    );
};
