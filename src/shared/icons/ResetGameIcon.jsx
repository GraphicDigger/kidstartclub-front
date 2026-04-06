import React from 'react';
import { Icon } from '../uiKit/Icon';


const svg = {
    m: [
        <React.Fragment key="open-sidebar-icon-m">
            <path d="M8.5 10.5L5 6L8.5 1.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.5 14C4.5 18.4183 8.08172 22 12.5 22C16.9183 22 20.5 18.4183 20.5 14C20.5 9.58172 16.9183 6 12.5 6H6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </React.Fragment>
    ],
    l: [
        <React.Fragment key="open-sidebar-icon-l">
            <path d="M11.5 13L7 7.5L11.5 2" stroke="currentColor" strokeWidth="3.10606" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.12122 16.4849C5.12122 21.4554 9.15065 25.4849 14.1212 25.4849C19.0918 25.4849 23.1212 21.4554 23.1212 16.4849C23.1212 11.5143 19.0918 7.48486 14.1212 7.48486H7.3748" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </React.Fragment>
    ]

};

export const ResetGameIcon = ({ size = 'm', color }) => {

    return (
        <Icon size={size} color={color}>
            {svg[size] || svg.m}
        </Icon>
    )
};
