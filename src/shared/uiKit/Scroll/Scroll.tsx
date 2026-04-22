"use client"    
import React, { forwardRef, use } from "react";
import styled from "@emotion/styled";
import { ScrollArea } from "radix-ui";

interface ScrollProps {
    children: React.ReactNode;
    maxHeight?: string;
    className?: string;
}

export const Scroll = forwardRef<HTMLDivElement, ScrollProps>(({
    children,
    maxHeight,
    className,
    ...props
}, ref) => (
    <StyledRoot $maxHeight={maxHeight} className={className} ref={ref} {...props}>
        <StyledViewport>
            {children}
        </StyledViewport>
        <StyledScrollbar orientation="vertical">
            <StyledThumb />
        </StyledScrollbar>
        <StyledScrollbar orientation="horizontal">
            <StyledThumb />
        </StyledScrollbar>
        <ScrollArea.Corner />
    </StyledRoot>
));

Scroll.displayName = "Scroll";

const StyledRoot = styled(ScrollArea.Root, {
    shouldForwardProp: (prop) => prop !== '$maxHeight',
})<{ $maxHeight?: string }>`
    overflow: hidden;
    max-height: ${({ $maxHeight }) => $maxHeight ?? '100%'};
    width: 100%;
    height: 100%;
    flex: 1;
    min-height: 0;
`;

const StyledViewport = styled(ScrollArea.Viewport)`
    width: 100%;
    height: 100%;
    overscroll-behavior: none;
`;

const StyledScrollbar = styled(ScrollArea.Scrollbar)`
    display: flex;
    user-select: none;
    touch-action: none;
    padding: 2px;
    background-color: rgba(0, 0, 0, 0.05);
    transition: background-color 0.15s ease;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }

    &[data-orientation="vertical"] {
        width: 6px;
    }

    &[data-orientation="horizontal"] {
        flex-direction: column;
        height: 6px;
    }
`;

const StyledThumb = styled(ScrollArea.Thumb)`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 3px;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        min-width: 44px;
        min-height: 44px;
    }
`;
