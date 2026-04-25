import React from 'react';
import { Icon } from '../uiKit/Icon';

const svg = {
    m: [
        <React.Fragment key="burger-icon-m">
            <path d="M3 15H17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M3 10H17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M3 5H17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </React.Fragment>
    ],
};

export const BurgerIcon = ({ size = 'm', color }) => {
    return <Icon size={size} color={color}>{svg[size] || svg.m}</Icon>;
};