'use client';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "@emotion/styled";
import { ButtonTool } from "../ButtonTool";
import { CrossIcon } from "@/shared/icons";

const DialogCtx = createContext(null);

export const Dialog = ({ children, open: controlledOpen = undefined, onOpenChange = undefined }) => {
    const [innerOpen, setInnerOpen] = useState(false);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : innerOpen;

    const setOpen = useCallback((val) => {
        const next = typeof val === 'function' ? val(open) : val;
        if (!isControlled) setInnerOpen(next);
        onOpenChange?.(next);
    }, [isControlled, open, onOpenChange]);

    return (
        <DialogCtx.Provider value={{ open, setOpen }}>
            {children}
        </DialogCtx.Provider>
    );
};

// Span с display:contents — layout-нейтральный контейнер, touch-события всплывают из дочернего.
// e.preventDefault() на touchend блокирует синтетический click — предотвращает двойной вызов.
export const DialogTrigger = ({ children }) => {
    const { setOpen } = useContext(DialogCtx);

    const handleOpen = useCallback((e) => {
        if (e.type === 'touchend') e.preventDefault();
        setOpen(true);
    }, [setOpen]);

    return (
        <span
            onTouchEnd={handleOpen}
            onClick={handleOpen}
            style={{
                display: 'inline-flex',
                cursor: 'pointer',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
            }}
        >
            {children}
        </span>
    );
};

export const DialogContent = ({
    children,
    title = undefined,
    hasOverlay = true,
    hasCloseButton = true,
    fullscreen = false,
    onClose = undefined,
    ...props
}) => {
    const { open, setOpen } = useContext(DialogCtx);
    const canCloseRef = useRef(false);

    // 200ms guard: предотвращает мгновенное закрытие тем же тапом что открыл диалог
    useEffect(() => {
        if (!open) return;
        canCloseRef.current = false;
        const t = setTimeout(() => { canCloseRef.current = true; }, 200);
        return () => clearTimeout(t);
    }, [open]);

    // Scroll lock для iOS: position:fixed + восстановление позиции при закрытии
    useEffect(() => {
        if (!open) return;
        const y = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${y}px`;
        document.body.style.width = '100%';
        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, y);
        };
    }, [open]);

    // Escape
    useEffect(() => {
        if (!open) return;
        const handler = (e) => {
            if (e.key === 'Escape') { setOpen(false); onClose?.(); }
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [open, setOpen, onClose]);

    const handleClose = useCallback(() => {
        setOpen(false);
        onClose?.();
    }, [setOpen, onClose]);

    const handleOverlay = useCallback(() => {
        if (!canCloseRef.current) return;
        handleClose();
    }, [handleClose]);

    if (!open) return null;

    return createPortal(
        <StyledPortal>
            {hasOverlay && (
                <StyledOverlay onTouchEnd={handleOverlay} onClick={handleOverlay} />
            )}
            <StyledContent $fullscreen={fullscreen} role="dialog" aria-modal="true" {...props}>
                {children}
                {hasCloseButton && (
                    <StyledClose>
                        <ButtonTool color="primary" onClick={handleClose}>
                            <CrossIcon size="m" />
                        </ButtonTool>
                    </StyledClose>
                )}
            </StyledContent>
        </StyledPortal>,
        document.body
    );
};

const StyledPortal = styled.div`
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledOverlay = styled.div`
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.8);
`;

const StyledContent = styled.div`
    position: relative;
    z-index: 1;
    background-color: #FFFFFF;
    border-radius: 12px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
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
        position: fixed;
        top: 44px;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100vw;
        max-width: 100vw;
        height: calc(100vh - 44px);
        max-height: calc(100vh - 44px);
        overflow: hidden;
    `}
`;

const StyledClose = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
`;
