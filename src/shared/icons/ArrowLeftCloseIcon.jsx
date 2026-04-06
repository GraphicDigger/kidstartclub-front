import React from 'react';
import { Icon } from '../uiKit/Icon';


const svg = {
    m: [
        <React.Fragment key="arrow-left-close-icon-m">
            <path d="M12 18L16 12L12 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 12H16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 7L21 17" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </React.Fragment>
    ]
};

export const ArrowLeftCloseIcon = ({ size = 'm', color }) => {

    return <Icon size={size} color={color}>{svg[size] || svg.m}</Icon>;
};
