import React from 'react';
import { Icon } from '../uiKit/Icon';


const svg = {
    s: [
        <React.Fragment key="code-star-icon-s">
            <path d="M9 17L3 10L9 3" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18 10H4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </React.Fragment>
    ]
};

export const ArrowLeftIcon = ({ size = 's', color }) => {

    return <Icon size={size} color={color}>{svg[size] || svg.s}</Icon>;
};
