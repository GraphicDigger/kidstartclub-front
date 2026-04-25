'use client';
import React, { forwardRef } from "react";
import styled from "@emotion/styled";
import { Dialog as DialogPrimitive } from "radix-ui";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ButtonTool } from "../ButtonTool"
import { CrossIcon } from "@/shared/icons"

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogContent = forwardRef(({
    children,
    title,
    hasOverlay = true,
    hasCloseButton = true,
    fullscreen = false,
    onClose,
    ...props
}, ref) => (
    <DialogPrimitive.Portal>
        {hasOverlay && <StyledDialogOverlay />}
        <StyledDialogContent $fullscreen={fullscreen} {...props} ref={ref}>
            <VisuallyHidden asChild>
                <DialogPrimitive.Title>{title}</DialogPrimitive.Title>
            </VisuallyHidden>
            {children}
            {hasCloseButton &&
                <StyledDialogClose asChild>
                    <ButtonTool color="primary">
                        <CrossIcon size="m" />
                    </ButtonTool>
                </StyledDialogClose>
            }
        </StyledDialogContent>
    </DialogPrimitive.Portal>
));

const StyledDialogOverlay = styled(DialogPrimitive.Overlay)`
    background-color: rgba(0, 0, 0, 0.8);
    position: fixed;
    inset: 0;
    z-index: 9999;
`;

const StyledDialogContent = styled(DialogPrimitive.Content, { shouldForwardProp: (prop) => prop !== '$fullscreen' })`
    background-color: #FFFFFF;
    border-radius: 12px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10000;
    width: 90vw;
    max-width: 500px;
    max-height: 85vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    ${({ $fullscreen }) => $fullscreen && `
        border-radius: 12px 12px 0 0;
        top: 44px;
        left: 0;
        transform: none;
        width: 100vw;
        max-width: 100vw;
        height: calc(100vh - 44px);
        max-height: calc(100vh - 44px);
        overflow: hidden;
    `}
`;

const StyledDialogClose = styled(DialogPrimitive.Close)`
    position: absolute;
    top: 10px;
    right: 10px;
`;

DialogContent.displayName = 'DialogContent';