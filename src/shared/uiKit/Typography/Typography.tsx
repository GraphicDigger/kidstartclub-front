'use client'
/** @jsxImportSource @emotion/react */
import React, { forwardRef } from 'react';
import styled from '@emotion/styled';
import { shouldForwardProp } from './lib/shouldForwardProp';


interface TypographyProps extends Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  color?: 'default' | 'muted' | 'inverse' | 'primary' | 'secondary' | 'disabled' | 'link' | 'success' | 'warning' | 'error' | (string & {});
  tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  variant?:
  'display.small' |
  'display.medium' |
  'display.large' |
  'headline.small' |
  'headline.medium' |
  'headline.large' |
  'title.large' |
  'title.medium' |
  'title.small' |
  'label.small' |
  'label.medium' |
  'body.small' |
  'body.medium' |
  'body.large' |
  'label.large' |
  'caps.small' |
  'caps.medium' |
  'caps.large';
  size?: number | string;
  lineHeight?: number | string;
  weight?: number | 'medium' | 'semibold' | 'bold';
  children?: React.ReactNode;
}

/** Пропсы стилей для Emotion (не все HTML-атрибуты span). */
type TypographyStyledProps = Pick<
  TypographyProps,
  'variant' | 'color' | 'size' | 'lineHeight' | 'weight'
>;

export const Typography = forwardRef<HTMLSpanElement, TypographyProps>(({
  color = 'default',
  tag = 'p',
  className,

  variant = 'body.small',
  size,
  lineHeight,
  weight,

  children,
  ...props
}, ref) => {
  return (
    <StyledTypography
      variant={variant}
      color={color}
      size={size}
      lineHeight={lineHeight}
      weight={weight}
      className={className}
      ref={ref}
      as={tag}
      {...props}
    >
      {children}
    </StyledTypography>
  );
});

const StyledTypography = styled('span', { shouldForwardProp })<
  TypographyStyledProps
>(
  ({ theme, variant = 'body.small', color = 'primary', size, lineHeight, weight }) => {
    const [group, variantSize] = variant.split('.')
    const typo = theme.sys.typography as Record<string, unknown>
    const variantStyle = variantSize
      ? (typo[group] as Record<string, Record<string, string | number>> | undefined)?.[variantSize]
      : typo[group] as Record<string, string | number> | undefined

    const raw = theme.sys.typography.color[color];
    const tc = typeof color === 'string' && color.startsWith('#') ? color : raw;

    const fw =
      typeof weight === 'number'
        ? weight
        : weight != null
          ? theme.sys.typography.fontWeight[weight] ??
          variantStyle?.fontWeight ??
          theme.sys.typography.fontWeight.medium
          : variantStyle?.fontWeight ??
          theme.sys.typography.fontWeight.medium

    const fs = size
      ? typeof size === 'number'
        ? `${size}px`
        : size
      : variantStyle?.fontSize

    const lh = lineHeight
      ? typeof lineHeight === 'number'
        ? `${lineHeight}px`
        : lineHeight
      : variantStyle?.lineHeight

    const tt = (variantStyle?.textTransform ?? 'none') as React.CSSProperties['textTransform']

    const ls = variantStyle?.letterSpacing ?? 0

    return {
      margin: 0,
      fontSize: fs,
      lineHeight: lh,
      fontWeight: fw,
      color: tc,
      textTransform: tt,
      letterSpacing: ls,
    }
  }
)
Typography.displayName = 'Typography';
