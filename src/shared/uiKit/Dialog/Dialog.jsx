import React, { forwardRef } from "react";
import styled from "@emotion/styled";
import { Dialog as DialogPrimitive } from "radix-ui";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "../Button"
import { CrossIcon } from "../../icons"

export const DialogContent = forwardRef(({
    children,
    title,
    hasOverlay = true,
    hasCloseButton = true,
    onClose,
    ...props
}, ref) => (
    <DialogPrimitive.Portal>
        {hasOverlay && <StyledDialogOverlay />}
        <StyledDialogContent {...props} ref={ref}>
            <VisuallyHidden asChild>
                <DialogPrimitive.Title>{title}</DialogPrimitive.Title>
            </VisuallyHidden>
            {children}
            {hasCloseButton &&
                <StyledDialogClose asChild>
                    <Button
                        size="small"
                        style="blank"
                        color="default"
                    >
                        <CrossIcon />
                    </Button>
                </StyledDialogClose>
            }
            <Button
                size="large"
                color="primary"
                onClick={onClose}
            >
                Повторить тренировку
            </Button>
        </StyledDialogContent>
    </DialogPrimitive.Portal>
));

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

const StyledDialogOverlay = styled(DialogPrimitive.Overlay)`
    background-color: rgba(0, 0, 0, 0.8);
    position: fixed;
    inset: 0;
    z-index: 9999;
`;

const StyledDialogContent = styled(DialogPrimitive.Content)`
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
    padding: 24px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
`;

const StyledDialogClose = styled(DialogPrimitive.Close)`
    position: absolute;
    top: 10px;
    right: 10px;
`;

DialogContent.displayName = 'DialogContent';