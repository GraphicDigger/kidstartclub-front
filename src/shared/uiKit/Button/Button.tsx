'use client'

/** @jsxImportSource @emotion/react */
import React, { memo, forwardRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { shouldForwardProp } from './lib/shouldForwardProp';


interface ButtonProps {
    variant?: 'filled' | 'lite' | 'blank';
    color?: 'default' | 'primary' | 'success' | 'warning' | 'error';
    size?: 'small' | 'medium' | 'large';
    stretch?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    externalHovered?: boolean;
    externalFocused?: boolean;
    isSelected?: boolean;
    focus?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
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
    const theme = useTheme()
    const hasChildren = !!children;

    const [internalHovered, setInternalHovered] = useState(false);
    const [internalFocused, setInternalFocused] = useState(false);

    const isHovered = typeof externalHovered === 'boolean' ? externalHovered : internalHovered;
    const isFocused = typeof externalFocused === 'boolean' ? externalFocused : internalFocused;

    const btn = theme?.comp?.button?.[variant]?.[color];

    const handleClick = useCallback((e) => {
        if (!disabled && onClick) {
            onClick(e);
        }
    }, [disabled, onClick]);

    // Объединенные обработчики для упрощения
    const handleMouseEnter = useCallback(() => {
        if (!disabled && externalHovered === undefined) {
            setInternalHovered(true);
        }
    }, [disabled, externalHovered, internalHovered]);

    const handleMouseLeave = useCallback(() => {
        if (!disabled && externalHovered === undefined) {
            setInternalHovered(false);
        }
    }, [disabled, externalHovered, internalHovered]);

    const handleFocus = useCallback((e) => {
        if (!disabled && externalFocused === undefined && focus) {
            setInternalFocused(true);
            e.stopPropagation();
        }
    }, [disabled, externalFocused, focus, internalFocused]);

    const handleBlur = useCallback((e) => {
        if (!disabled && externalFocused === undefined && focus) {
            if (!e.currentTarget.contains(e.relatedTarget)) {
                setInternalFocused(false);
            }
            e.stopPropagation();
        }
    }, [disabled, externalFocused, focus, internalFocused]);


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
            {startIcon && (
                <StyledIcon $colors={btn?.default?.icon}>{startIcon}</StyledIcon>
            )}
            {children && <StyledText>{children}</StyledText>}
            {endIcon && (
                <StyledIcon $colors={btn?.default?.icon}>{endIcon}</StyledIcon>
            )}
        </StyledButton>
    );
}));

// Стилизованные компоненты
const StyledButton = styled('button', { shouldForwardProp })(
    ({
        theme,
        $variant,
        $color,
        $disabled,
        $isHovered,
        $isFocused,
        $isSelected,
        $size,
        $stretch,
    }) => {
        const comp = theme?.comp?.button?.[$variant]?.[$color];

        let bgColor = 'transparent';
        if (comp) {
            if ($disabled && comp.disabled?.background) bgColor = comp.disabled.background;
            else if ($isSelected && comp.selected?.background) bgColor = comp.selected.background;
            else if ($isFocused && comp.selected?.background) bgColor = comp.selected.background;
            else if ($isHovered && comp.hover?.background) bgColor = comp.hover.background;
            else bgColor = comp.default?.background || 'transparent';
        }

        let iconColor = 'inherit';
        if (comp) {
            if ($disabled && comp.disabled?.icon) iconColor = comp.disabled.icon;
            else if ($isSelected && comp.selected?.icon) iconColor = comp.selected.icon;
            else if ($isFocused && comp.selected?.icon) iconColor = comp.selected.icon;
            else if ($isHovered && comp.hover?.icon) iconColor = comp.hover.icon;
            else iconColor = comp.default?.icon || 'inherit';
        }

        let textColor = 'inherit';
        if (comp) {
            if ($disabled && comp.disabled?.text) textColor = comp.disabled.text;
            else if ($isSelected && comp.selected?.text) textColor = comp.selected.text;
            else if ($isFocused && comp.selected?.text) textColor = comp.selected.text;
            else if ($isHovered && comp.hover?.text) textColor = comp.hover.text;
            else textColor = comp.default?.text || 'inherit';
        }

        const height =
            typeof $size === 'number' ? `${$size}px` : theme.sys.size[$size];

        let fontSize = '14px';
        switch ($size) {
            case 'large':
                fontSize = '16px';
                break;
            case 'small':
            case 'medium':
            default:
                fontSize = '14px';
        }

        return {
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
            justifyContent: 'center',
            gap: theme.sys.spacing.small,
            padding: `0 ${theme.sys.spacing.medium}`,
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
            borderRadius: theme.sys.borderRadius.small,
            cursor: $disabled ? 'not-allowed' : 'pointer',
            '& [fill]:not([fill="none"])': {
                fill: iconColor,
                stroke: 'none',
            },
            '& [stroke]:not([stroke="none"])': {
                stroke: iconColor,
                fill: 'none',
            },
            '& [fill][stroke]:not([fill="none"]):not([stroke="none"])': {
                fill: iconColor,
                stroke: iconColor,
            },
        };
    }
);

const StyledIcon = styled('div')({ display: 'contents' });

const StyledText = styled('div')({ whiteSpace: 'nowrap' });

Button.propTypes = {
    variant: PropTypes.oneOf(['filled', 'lite', 'blank']),
    color: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'error']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    disabled: PropTypes.bool,
    children: PropTypes.node,
    onClick: PropTypes.func,
    startIcon: PropTypes.node,
    endIcon: PropTypes.node,
    stretch: PropTypes.bool,
};









// /** @jsxImportSource @emotion/react */
// import React from 'react';
// import PropTypes from 'prop-types';
// import styles from './Button.module.scss';
// import classNames from 'classnames';

// export const Button = ({
//     size = 'medium',
//     style = 'filled',
//     color = 'default',
//     className = '',
//     disabled = false,
//     type = 'button',
//     onClick,
//     children,
//     startIcon,
//     endIcon,
//     ...props
// }) => {

//     const buttonClass = classNames(
//         styles[`button-${size}`],
//         styles[`button-${style}-${color}`],
//         startIcon && !children && styles['button-icon'],
//         endIcon && !children && styles['button-icon'],
//         className
//       );

//     return (
//         <button
//             className={buttonClass}
//             type={type}
//             disabled={disabled}
//             onClick={disabled ? undefined : onClick}
//             {...props}
//         >
//             {startIcon && startIcon}
//             {children && <span className={styles.content}>{children}</span>}
//             {endIcon && <span className={styles.icon}>{endIcon}</span>}
//         </button>
//     );
// };

// Button.propTypes = {
//     size: PropTypes.oneOf(['large', 'medium', 'small']),
//     style: PropTypes.oneOf(['filled', 'outlined', 'blank']),
//     color: PropTypes.oneOf(['default', 'primary', 'secondary']),
//     className: PropTypes.string,
//     leftIcon: PropTypes.node,
//     rightIcon: PropTypes.node,
//     disabled: PropTypes.bool,
//     type: PropTypes.string,
//     onClick: PropTypes.func,
//     children: PropTypes.node.isRequired
// };

// export default Button;
