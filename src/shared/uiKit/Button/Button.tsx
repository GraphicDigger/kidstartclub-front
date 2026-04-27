'use client'

import React, { memo, forwardRef, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { shouldForwardProp } from './lib/shouldForwardProp';

type Variant = 'filled' | 'lite' | 'blank';
type Color = 'default' | 'primary' | 'success' | 'warning' | 'error';
type Size = 'small' | 'medium' | 'large';

interface ButtonProps {
    variant?: Variant;
    color?: Color;
    size?: Size;
    stretch?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    externalHovered?: boolean;
    externalFocused?: boolean;
    isSelected?: boolean;
    focus?: boolean;
    children?: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    className?: string;
}

interface StyledButtonProps {
    $variant: Variant;
    $color: Color;
    $size: Size;
    $stretch: boolean;
    $disabled: boolean;
    $isHovered: boolean;
    $isFocused: boolean;
    $isSelected: boolean;
}

export const Button = memo(forwardRef<HTMLButtonElement, ButtonProps>(({
    variant = 'filled',
    color = 'primary',
    size = 'small',
    stretch = false,

    startIcon,
    endIcon,

    externalHovered,
    externalFocused,
    isSelected = false,
    focus = false,

    children,
    onClick,
    disabled = false,
    className,
}, ref) => {
    const [internalHovered, setInternalHovered] = useState(false);
    const [internalFocused, setInternalFocused] = useState(false);

    const isHovered = typeof externalHovered === 'boolean' ? externalHovered : internalHovered;
    const isFocused = typeof externalFocused === 'boolean' ? externalFocused : internalFocused;

    const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disabled && onClick) {
            onClick(e);
        }
    }, [disabled, onClick]);

    const handleMouseEnter = useCallback(() => {
        if (!disabled && externalHovered === undefined) setInternalHovered(true);
    }, [disabled, externalHovered]);

    const handleMouseLeave = useCallback(() => {
        if (!disabled && externalHovered === undefined) setInternalHovered(false);
    }, [disabled, externalHovered]);

    const handleFocus = useCallback((e: React.FocusEvent<HTMLButtonElement>) => {
        if (!disabled && externalFocused === undefined && focus) {
            setInternalFocused(true);
            e.stopPropagation();
        }
    }, [disabled, externalFocused, focus]);

    const handleBlur = useCallback((e: React.FocusEvent<HTMLButtonElement>) => {
        if (!disabled && externalFocused === undefined && focus) {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                setInternalFocused(false);
            }
            e.stopPropagation();
        }
    }, [disabled, externalFocused, focus]);

    return (
        <StyledButton
            ref={ref}
            className={className}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
            onBlur={handleBlur}
            $size={size}
            $stretch={stretch}
            $disabled={disabled}
            $color={color}
            $variant={variant}
            $isHovered={isHovered}
            $isFocused={isFocused}
            $isSelected={isSelected}
        >
            {startIcon && <StyledIcon>{startIcon}</StyledIcon>}
            {children && <StyledText>{children}</StyledText>}
            {endIcon && <StyledIcon>{endIcon}</StyledIcon>}
        </StyledButton>
    );
}));

Button.displayName = 'Button';

const StyledButton = styled('button', { shouldForwardProp })<StyledButtonProps>(
    ({ theme, $variant, $color, $disabled, $isHovered, $isFocused, $isSelected, $size, $stretch }) => {
        const comp: any = (theme as any)?.comp?.button?.[$variant]?.[$color];

        const pickColor = (key: 'background' | 'text' | 'icon', fallback: string) => {
            if (!comp) return fallback;
            if ($disabled && comp.disabled?.[key]) return comp.disabled[key];
            if (($isSelected || $isFocused) && comp.selected?.[key]) return comp.selected[key];
            if ($isHovered && comp.hover?.[key]) return comp.hover[key];
            return comp.default?.[key] ?? fallback;
        };

        const bgColor = pickColor('background', 'transparent');
        const textColor = pickColor('text', 'inherit');
        const iconColor = pickColor('icon', 'inherit');

        const sysSize = (theme as any)?.sys?.size ?? {};
        const height = sysSize[$size] ?? '32px';

        const fontSize = $size === 'large' ? '16px' : '14px';

        return {
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
            justifyContent: 'center',
            gap: (theme as any)?.sys?.spacing?.small,
            padding: `0 ${(theme as any)?.sys?.spacing?.medium}`,
            width: $stretch ? '100%' : 'max-content',
            height,
            maxWidth: '100%',
            backgroundColor: bgColor,
            color: textColor,
            opacity: $disabled ? 0.5 : 1,
            lineHeight: 1,
            letterSpacing: '-0.1px',
            fontWeight: 600,
            fontSize,
            borderRadius: (theme as any)?.sys?.borderRadius?.small,
            cursor: $disabled ? 'not-allowed' : 'pointer',
            '& [fill]:not([fill="none"])': { fill: iconColor, stroke: 'none' },
            '& [stroke]:not([stroke="none"])': { stroke: iconColor, fill: 'none' },
            '& [fill][stroke]:not([fill="none"]):not([stroke="none"])': {
                fill: iconColor,
                stroke: iconColor,
            },
        };
    }
);

const StyledIcon = styled('div')({ display: 'contents' });
const StyledText = styled('div')({ whiteSpace: 'nowrap' });
