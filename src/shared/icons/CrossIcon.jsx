import React from 'react';
import { Icon } from '../uiKit/Icon';

const svg = {
    xs: [
        <React.Fragment key="cross-icon-xs">
            <path d="M12.5002 3.5002L3.5 12.5" stroke="currentColor" strokeWidth="1.75" />
            <path d="M3.50008 3.49995L12.5 12.5" stroke="currentColor" strokeWidth="1.75" />
        </React.Fragment>
    ],
    s: [
        <React.Fragment key="cross-icon-xs">
            <path d="M12.5 3.5L3.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M3.5 3.50001L12.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </React.Fragment>
    ],
    m: [
        <React.Fragment key="cross-icon-m">
            <path d="M5 5L15 15" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" />
            <path d="M15 5L5 15" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" />
        </React.Fragment>
    ],
};

export const CrossIcon = ({ size = 'm', color }) => {
    return <Icon size={size} color={color}>{svg[size] || svg.m}</Icon>;
};