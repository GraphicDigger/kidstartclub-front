"use client"
import React, { forwardRef } from "react";
import styled from "@emotion/styled";
import { ScrollArea as RadixScrollArea } from "radix-ui";

interface ScrollAreaProps {
    children: React.ReactNode;
    maxHeight?: string;
    maxWidth?: string;
    className?: string;
    orientation?: "vertical" | "horizontal" | "both";
    type?: "auto" | "always" | "scroll" | "hover";
    showScrollbar?: boolean;
    contentPadding?: string;
}

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(({
    children,
    maxHeight,
    maxWidth,
    className,
    orientation = "vertical",
    showScrollbar = false,
    contentPadding,
    type = "scroll",
    ...props
}, ref) => {
    // Без скроллбара — нативный CSS scroll. Работает на всех iOS включая 15.
    if (!showScrollbar) {
        return (
            <NativeScroll
                ref={ref}
                $orientation={orientation}
                $maxHeight={maxHeight}
                $maxWidth={maxWidth}
                className={className}
                {...props}
            >
                {contentPadding
                    ? <div style={{ padding: contentPadding }}>{children}</div>
                    : children
                }
            </NativeScroll>
        );
    }

    // С видимым скроллбаром — Radix для кастомного UI.
    return (
        <StyledRoot
            $maxHeight={maxHeight}
            $maxWidth={maxWidth}
            $orientation={orientation}
            className={className}
            ref={ref}
            type={type}
            {...props}
        >
            <StyledViewport $orientation={orientation}>
                {children}
            </StyledViewport>
            {(orientation === "vertical" || orientation === "both") && (
                <StyledScrollbar orientation="vertical">
                    <StyledThumb />
                </StyledScrollbar>
            )}
            {(orientation === "horizontal" || orientation === "both") && (
                <StyledScrollbar orientation="horizontal">
                    <StyledThumb />
                </StyledScrollbar>
            )}
            {orientation === "both" && <RadixScrollArea.Corner />}
        </StyledRoot>
    );
});

ScrollArea.displayName = "ScrollArea";

// ─── Native scroll (showScrollbar=false) ─────────────────────────────────

const NativeScroll = styled.div<{
    $orientation?: string;
    $maxHeight?: string;
    $maxWidth?: string;
}>`
    width: 100%;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
    -webkit-overflow-scrolling: touch;

    ${({ $maxHeight }) => $maxHeight && `max-height: ${$maxHeight};`}
    ${({ $maxWidth }) => $maxWidth && `max-width: ${$maxWidth};`}

    ${({ $orientation }) => $orientation === "horizontal" ? `
        overflow-x: auto;
        overflow-y: hidden;
        touch-action: pan-x;
    ` : $orientation === "both" ? `
        overflow: auto;
        touch-action: pan-x pan-y;
        flex: 1;
        min-height: 0;
    ` : `
        overflow-y: auto;
        overflow-x: hidden;
        touch-action: pan-y;
        flex: 1;
        min-height: 0;
        height: 100%;
    `}
`;

// ─── Radix scroll (showScrollbar=true) ───────────────────────────────────

const StyledRoot = styled(RadixScrollArea.Root, {
    shouldForwardProp: (prop) => !['$maxHeight', '$maxWidth', '$orientation'].includes(prop as string),
})<{ $maxHeight?: string; $maxWidth?: string; $orientation?: string }>`
    overflow: hidden;
    width: 100%;
    ${({ $maxHeight }) => $maxHeight && `max-height: ${$maxHeight};`}
    ${({ $maxWidth }) => $maxWidth && `max-width: ${$maxWidth};`}

    ${({ $orientation }) => ($orientation === 'vertical' || $orientation === 'both') ? `
        display: flex;
        flex-direction: column;
        flex: 1;
        min-height: 0;
        height: 100%;
    ` : `
        display: block;
    `}
`;

const StyledViewport = styled(RadixScrollArea.Viewport, {
    shouldForwardProp: (prop) => prop !== '$orientation',
})<{ $orientation?: string }>`
    width: 100%;
    border-radius: inherit;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;

    ${({ $orientation }) => ($orientation === 'vertical' || $orientation === 'both') ? `
        flex: 1;
        min-height: 0;
        touch-action: pan-y;
    ` : `
        touch-action: pan-x;
    `}
`;

const StyledScrollbar = styled(RadixScrollArea.Scrollbar)`
    display: flex;
    user-select: none;
    touch-action: none;
    padding: 2px;
    background-color: transparent;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;

    &[data-state="visible"] {
        opacity: 1;
        pointer-events: auto;
    }

    &[data-orientation="vertical"] { width: 6px; }
    &[data-orientation="horizontal"] { flex-direction: column; height: 6px; }
`;

const StyledThumb = styled(RadixScrollArea.Thumb)`
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
