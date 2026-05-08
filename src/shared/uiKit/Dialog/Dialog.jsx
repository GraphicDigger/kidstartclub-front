'use client';
import React, {
    createContext, useCallback, useContext, useEffect,
    useMemo, useRef, useState,
} from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { ButtonTool } from '../ButtonTool';
import { CrossIcon } from '@/shared/icons';

// ─── Context ──────────────────────────────────────────────────────────────

const DialogContext = createContext(null);
const useDialog = () => useContext(DialogContext);

// ─── Scroll lock (iOS-safe: position fixed, не pointer-events) ────────────

let lockDepth = 0;
let savedScrollY = 0;

function lockBodyScroll() {
    if (lockDepth++ > 0) return;
    savedScrollY = window.scrollY;
    Object.assign(document.body.style, {
        position: 'fixed',
        top: `-${savedScrollY}px`,
        width: '100%',
        overflowY: 'scroll',
    });
}

function unlockBodyScroll() {
    if (--lockDepth > 0) return;
    Object.assign(document.body.style, {
        position: '',
        top: '',
        width: '',
        overflowY: '',
    });
    window.scrollTo(0, savedScrollY);
}

// ─── Focus trap ───────────────────────────────────────────────────────────

const FOCUSABLE = [
    'button:not([disabled])',
    '[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(', ');

function useFocusTrap(ref, enabled) {
    useEffect(() => {
        if (!enabled || !ref.current) return;
        const el = ref.current;
        const prev = document.activeElement;
        const getFocusable = () => [...el.querySelectorAll(FOCUSABLE)];
        getFocusable()[0]?.focus();

        const onKeyDown = (e) => {
            if (e.key !== 'Tab') return;
            const nodes = getFocusable();
            if (!nodes.length) { e.preventDefault(); return; }
            const first = nodes[0];
            const last = nodes[nodes.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            prev?.focus?.();
        };
    }, [ref, enabled]);
}

// ─── Dialog ───────────────────────────────────────────────────────────────

export const Dialog = ({ children, open: controlledOpen = undefined, onOpenChange = undefined, modal = true, defaultOpen = false }) => {
    const [innerOpen, setInnerOpen] = useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : innerOpen;

    const setOpen = useCallback((val) => {
        const next = typeof val === 'function' ? val(open) : val;
        if (!isControlled) setInnerOpen(next);
        onOpenChange?.(next);
    }, [isControlled, open, onOpenChange]);

    const ctx = useMemo(() => ({ open, setOpen, modal }), [open, setOpen, modal]);

    return <DialogContext.Provider value={ctx}>{children}</DialogContext.Provider>;
};

// ─── DialogTrigger ────────────────────────────────────────────────────────

export const DialogTrigger = ({ children, asChild = false }) => {
    const { setOpen } = useDialog();

    const handleOpen = useCallback((e) => {
        e?.stopPropagation();
        setOpen(true);
    }, [setOpen]);

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
            onClick: composeHandlers(children.props.onClick, handleOpen),
        });
    }

    return (
        <button type="button" onClick={handleOpen} style={{ display: 'contents' }}>
            {children}
        </button>
    );
};

// ─── DialogContent ────────────────────────────────────────────────────────

export const DialogContent = ({
    children,
    title,
    hasOverlay = true,
    hasCloseButton = true,
    fullscreen = false,
    onClose,
    ...rest
}) => {
    const { open, setOpen, modal } = useDialog();
    const contentRef = useRef(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    useFocusTrap(contentRef, open && modal);

    useEffect(() => {
        if (!open || !modal) return;
        lockBodyScroll();
        return unlockBodyScroll;
    }, [open, modal]);

    const close = useCallback(() => {
        setOpen(false);
        onClose?.();
    }, [setOpen, onClose]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => { if (e.key === 'Escape') close(); };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open, close]);

    if (!mounted || !open) return null;

    return createPortal(
        <>
            {hasOverlay && <StyledOverlay onClick={close} />}
            <StyledContent
                ref={contentRef}
                $fullscreen={fullscreen}
                role="dialog"
                aria-modal={modal || undefined}
                aria-label={typeof title === 'string' ? title : undefined}
                {...rest}
            >
                {children}
                {hasCloseButton && (
                    <StyledCloseButton>
                        <ButtonTool color="primary" onClick={close}>
                            <CrossIcon size="m" />
                        </ButtonTool>
                    </StyledCloseButton>
                )}
            </StyledContent>
        </>,
        document.body
    );
};

DialogContent.displayName = 'DialogContent';

// ─── DialogClose ──────────────────────────────────────────────────────────

export const DialogClose = ({ children, asChild = false }) => {
    const { setOpen } = useDialog();
    const close = useCallback(() => setOpen(false), [setOpen]);

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
            onClick: composeHandlers(children.props.onClick, close),
        });
    }
    return <button type="button" onClick={close}>{children}</button>;
};

// ─── Helpers ──────────────────────────────────────────────────────────────

function composeHandlers(...fns) {
    return (e) => fns.forEach(fn => fn?.(e));
}

// ─── Styled ───────────────────────────────────────────────────────────────

const StyledOverlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.8);
`;

const StyledContent = styled.div`
    background-color: #fff;
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
    -webkit-overflow-scrolling: touch;
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
        height: calc(100dvh - 44px);
        max-height: calc(100dvh - 44px);
        overflow: hidden;
    `}
`;

const StyledCloseButton = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
`;
