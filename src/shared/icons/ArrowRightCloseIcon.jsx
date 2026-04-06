import React from 'react';
import { Icon } from '../uiKit/Icon';


const svg = {
    m: [
        <React.Fragment key="arrow-right-close-icon-m">
            <path d="M12 18L8 12L12 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M22 12H8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 7L3 17" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </React.Fragment>
    ]
};

export const ArrowRightCloseIcon = ({ size = 'm', color }) => {

    return <Icon size={size} color={color}>{svg[size] || svg.m}</Icon>;
};
