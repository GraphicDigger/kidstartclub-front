'use client';
/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';

export const Dot = ({
    color,
    onClick,
    disabled,
    size = 'medium',
    children,
    onMouseEnter,
    onMouseLeave,
}) => {


    return (
        <StyledDot
            onClick={onClick}
            disabled={disabled}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            size={size}
            color={color}
        >
            {children}
        </StyledDot>
    );
};

const StyledDot = styled.div`
    aspect-ratio: 1;
    border-radius: 50%;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    background-color: ${({ color }) => color ? color : 'transparent'};
    width: ${({ size }) => {
        if (typeof size === 'number') return `${size}px`
        if (size === 'xsmall') return '40px'
        if (size === 'small') return '60px'
        if (size === 'medium') return '80px'
        if (size === 'large') return '100px'
        return size;
    }};
    height: ${({ size }) => {
        if (typeof size === 'number') return `${size}px`
        if (size === 'xsmall') return '40px'
        if (size === 'small') return '60px'
        if (size === 'medium') return '80px'
        if (size === 'large') return '100px'
        return size;
    }};   
    margin: ${({ spacing }) => spacing};
    cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
    opacity: ${({ disabled }) => disabled ? 1 : 1};
    pointer-events: ${({ disabled }) => disabled ? 'none' : 'auto'};
`;



