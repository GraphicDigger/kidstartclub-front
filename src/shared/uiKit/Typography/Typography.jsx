'use client'
/** @jsxImportSource @emotion/react */
import React, { forwardRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css, useTheme } from '@emotion/react';

export const Typography = forwardRef(({
    color = 'primary',
    tag = 'p',
    className,
    
    variant = 'body.small',
    size,
    lineHeight,
    weight,
    
    children,
    ...props
}, forwardRef) => {
    const theme = useTheme()
    
    const [category, variantSize] = variant.split('.')
    const variantStyle = theme.ref.typography?.[category]?.[variantSize]

    const computedStyles = useMemo(() => {

        const textColor = theme.sys.color.typography[color] ?? theme.sys.color.typography.primary
        const fontWeight = typeof weight === 'number'
            ? weight : theme.ref.typography.fontWeight?.[weight] ?? variantStyle.fontWeight ?? theme.ref.typography.fontWeight.medium

        return css`
            font-size: ${size ? (typeof size === 'number' ? `${size}px` : size) : variantStyle.fontSize};
            line-height: ${lineHeight ? (typeof lineHeight === 'number' ? `${lineHeight}px` : lineHeight) : variantStyle.lineHeight};
            font-weight: ${fontWeight};
            color: ${textColor};
        `;
    }, [color, size, lineHeight, weight, variantStyle, theme, forwardRef])

    return (
        <StyledTypography
            css={computedStyles}
            className={className}
            ref={forwardRef}
            as={tag}
            {...props}
        >
            {children}
        </StyledTypography>
    );
});

const StyledTypography = styled.span`
  margin: 0;
`;

Typography.propTypes = {
    children: PropTypes.node,
    variant: PropTypes.oneOf([
        'body.xsmall',
        'body.small',
        'body.medium',
        'heading.xsmall',
        'heading.small',
        'heading.medium',
        'heading.large',
    ]),
    color: PropTypes.oneOf([
        'primary',
        'secondary',
        'disabled',
        'link',
        'success',
        'warning',
        'error',
    ]),
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    lineHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    weight: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['medium', 'semibold', 'bold'])]),
    tag: PropTypes.string,
    className: PropTypes.string,
};

Typography.displayName = 'Typography';