import React from 'react';
import { Icon } from '../uiKit/Icon';


const svg = {
    m: [
        <React.Fragment key="open-sidebar-icon-m">
            <path d="M9 4.5V8.5C15 9.5 20 13.5 23 20C18 16 14 14 9 13.5V17.5L0.5 11L9 4.5Z" fill="currentColor"/>
        </React.Fragment>
    ]
};

export const ShareIcon = ({ size = 'm', color }) => {

    return (
        <Icon size={size} color={color}>
            {svg[size] || svg.m}
        </Icon>
    )
};
