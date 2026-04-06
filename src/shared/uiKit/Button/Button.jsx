'use client'
// src/shared/uiKit/Button/Button.jsx
/** @jsxImportSource @emotion/react */
import React, { memo, forwardRef, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

export const Button = memo(forwardRef(({
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

    const buttonTheme = useMemo(() =>
        theme?.comp?.button?.[color]?.[variant],
        [theme, color, variant]
    );

    const backgroundColor = useMemo(() => {
        if (!buttonTheme) return 'transparent';
        if (disabled && buttonTheme.disabled?.background) return buttonTheme.disabled.background;
        if (isSelected && buttonTheme.selected?.background) return buttonTheme.selected.background;
        if (isFocused && buttonTheme.selected?.background) return buttonTheme.selected.background;
        if (isHovered && buttonTheme.hover?.background) return buttonTheme.hover.background;
        return buttonTheme.default?.background || 'transparent';
    }, [buttonTheme, isHovered, isFocused, isSelected, disabled]);

    const iconColor = useMemo(() => {
        if (!buttonTheme) return 'inherit';
        if (disabled && buttonTheme.disabled?.icon) return buttonTheme.disabled.icon;
        if (isSelected && buttonTheme.selected?.icon) return buttonTheme.selected.icon;
        if (isFocused && buttonTheme.selected?.icon) return buttonTheme.selected.icon;
        if (isHovered && buttonTheme.hover?.icon) return buttonTheme.hover.icon;
        return buttonTheme.default?.icon || 'inherit';
    }, [buttonTheme, isHovered, isFocused, isSelected, disabled]);

    const textColor = useMemo(() => {
        if (!buttonTheme) return 'inherit';
        if (disabled && buttonTheme.disabled?.text) return buttonTheme.disabled.text;
        if (isSelected && buttonTheme.selected?.text) return buttonTheme.selected.text;
        if (isFocused && buttonTheme.selected?.text) return buttonTheme.selected.text;
        if (isHovered && buttonTheme.hover?.text) return buttonTheme.hover.text;
        return buttonTheme.default?.text || 'inherit';
    }, [buttonTheme, isHovered, isFocused, isSelected, disabled]);

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
            theme={theme}
            backgroundColor={backgroundColor}
            textColor={textColor}
            iconColor={iconColor}
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
        >
            {startIcon && <StyledIcon $colors={theme.comp.button[color][variant].default.icon}>{startIcon}</StyledIcon>}
            {children && <StyledText>{children}</StyledText>}
            {endIcon && <StyledIcon $colors={theme.comp.button[color][variant].default.icon}>{endIcon}</StyledIcon>}
        </StyledButton>
    );
}));

// Стилизованные компоненты
const StyledButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.ref.spacing.small};
    width: ${({ $stretch }) => $stretch ? '100%' : 'max-content'};
    background-color: ${({ backgroundColor }) => backgroundColor};
    color: ${({ textColor }) => textColor};
    height: ${({ $size, theme }) => {
        if (typeof $size === 'number') { return `${$size}px` }
        return theme.ref.size[$size];
    }};
    font-size: ${({ $size, theme }) => {
        switch ($size) {
            case 'small':
                return theme.ref.typography.body.small.fontSize;
            case 'medium':
                return theme.ref.typography.body.small.fontSize;
            case 'large':
                return theme.ref.typography.body.medium.fontSize;
            default:
                return theme.ref.typography.body.small.fontSize;
        }
    }};
    line-height: ${({ theme }) => theme.ref.typography.lineHeight.lh100};
    border-radius: ${({ theme }) => theme.ref.borderRadius.small};
    flex-shrink: 0;
    cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
    max-width: 100%;
    padding: 0 ${({ theme }) => theme.ref.spacing.medium};
    opacity: ${({ $disabled }) => $disabled ? 0.5 : 1};

    & [fill]:not([fill="none"]) {
        fill: ${({ iconColor }) => iconColor};
        stroke: none;
    }
    & [stroke]:not([stroke="none"]) {
        stroke: ${({ iconColor }) => iconColor};
        fill: none;
    }
    & [fill][stroke]:not([fill="none"]):not([stroke="none"]) {
        fill: ${({ iconColor }) => iconColor};
        stroke: ${({ iconColor }) => iconColor};
    } 
`;

const StyledIcon = styled.div`
    display: contents;
`;

const StyledText = styled.div`
    white-space: nowrap;
`;

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
