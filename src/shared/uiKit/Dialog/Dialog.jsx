'use client';
import { createContext, forwardRef, useCallback, useContext, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Dialog as DialogPrimitive } from "radix-ui";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ButtonTool } from "../ButtonTool"
import { CrossIcon } from "@/shared/icons"

// Контекст для управления состоянием диалога из DialogTrigger
const DialogSetOpenContext = createContext(null);

// Обёртка над Radix Root: управляем состоянием сами,
// чтобы DialogTrigger мог открывать диалог напрямую через onTouchEnd
export const Dialog = ({ children, open: controlledOpen = undefined, onOpenChange = undefined, ...props }) => {
    const [innerOpen, setInnerOpen] = useState(false);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : innerOpen;

    const setOpen = useCallback((val) => {
        const next = typeof val === 'function' ? val(open) : val;
        if (!isControlled) setInnerOpen(next);
        onOpenChange?.(next);
    }, [isControlled, open, onOpenChange]);

    return (
        <DialogSetOpenContext.Provider value={setOpen}>
            <DialogPrimitive.Root open={open} onOpenChange={setOpen} {...props}>
                {children}
            </DialogPrimitive.Root>
        </DialogSetOpenContext.Provider>
    );
};

// Кастомный триггер: не использует Radix DialogTrigger (он использует onPointerDown).
// Оборачиваем в span[display:contents] — layout-нейтральный, события всплывают из дочернего.
// Не используем cloneElement/asChild: дочерние компоненты (ButtonTool) не форвардят onTouchEnd.
export const DialogTrigger = ({ children }) => {
    const setOpen = useContext(DialogSetOpenContext);

    const handleOpen = useCallback((e) => {
        if (e.type === 'touchend') e.preventDefault();
        setOpen?.(true);
    }, [setOpen]);

    return (
        <span onTouchEnd={handleOpen} onClick={handleOpen} style={{ display: 'contents' }}>
            {children}
        </span>
    );
};

export const DialogContent = /** @type {import('react').ForwardRefExoticComponent<{
    children?: import('react').ReactNode,
    title?: import('react').ReactNode,
    hasOverlay?: boolean,
    hasCloseButton?: boolean,
    fullscreen?: boolean,
    onClose?: () => void,
    [key: string]: any,
} & import('react').RefAttributes<HTMLDivElement>>} */ (forwardRef(({
    children,
    title,
    hasOverlay = true,
    hasCloseButton = true,
    fullscreen = false,
    onClose,
    ...props
}, ref) => {
    // iOS 15: тот же тап что открыл диалог может сразу его закрыть через overlay.
    // Блокируем закрытие на 200ms после монтирования (= после открытия).
    const canCloseRef = useRef(false);
    useEffect(() => {
        canCloseRef.current = false;
        const t = setTimeout(() => { canCloseRef.current = true; }, 200);
        return () => clearTimeout(t);
    }, []);

    return (
        <DialogPrimitive.Portal>
            {hasOverlay && <StyledDialogOverlay />}
            <StyledDialogContent
                $fullscreen={fullscreen}
                {...props}
                ref={ref}
                onPointerDownOutside={(e) => {
                    if (!canCloseRef.current) e.preventDefault();
                    props.onPointerDownOutside?.(e);
                }}
                onInteractOutside={(e) => {
                    if (!canCloseRef.current) e.preventDefault();
                    props.onInteractOutside?.(e);
                }}
            >
                <VisuallyHidden asChild>
                    <DialogPrimitive.Title>{title}</DialogPrimitive.Title>
                </VisuallyHidden>
                {children}
                {hasCloseButton &&
                    <StyledDialogClose asChild>
                        <ButtonTool color="primary" onClick={onClose}>
                            <CrossIcon size="m" />
                        </ButtonTool>
                    </StyledDialogClose>
                }
            </StyledDialogContent>
        </DialogPrimitive.Portal>
    );
}));

DialogContent.displayName = 'DialogContent';


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
