'use client';

import React, { memo, forwardRef } from 'react';
import { Typography } from '../Typography';
import { Button } from '../Button';
import { Stack } from '../Stack';
import styled from '@emotion/styled';
import { Box } from '../Box';
import { CardCover } from './CardCover';
import { CardText } from './CardText';


export interface CardProps {
  children?: React.ReactNode;
  className?: string;
  /** Соотношение сторон ячейки обложки в «широком» режиме (ширина / высота). Логика в CardCover. */
  aspectRatio?: string | number;
  /**
   * Принудительно fixed-ячейка (например hero). Иначе в CardCover: натуральная высота;
   * для очень широких кадров (w/h > 1.5) — ячейка 1.5∶1. Высокие обложки (h/w > 1.5) без обрезки.
   */
  imageFixed?: boolean;
  height?: string | number;
  width?: string | number;
  imageSrc?: string;
  imageAlt?: string;
  subtitle?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  detail?: React.ReactNode;
  actionLabel?: React.ReactNode;
  onAction?: () => void;
  imageBgColor?: string;
  frame?: boolean | string;
  maxWidth?: string | number;
  topSlot?: React.ReactNode;
  bottomSlot?: React.ReactNode;
}
export const Card = memo(forwardRef<HTMLDivElement, CardProps>(({
  children,
  frame = true,
  height = 'fit',
  width,
  maxWidth,

  subtitle,
  title,
  description,

  imageSrc,
  imageFixed,
  aspectRatio,
  imageBgColor,
  imageAlt = '',

  detail,
  actionLabel,
  onClick,
  className,
  ...props
},
  ref
) => {

  return (
    <StyledCard
      direction="column"
      width={width}
      height={height}
      maxWidth={maxWidth}
      alignX="start"
      alignY="start"
      overflow="hidden"
      frame={frame}
      onClick={onClick}
    >
      <CardCover
        src={imageSrc}
        alt={imageAlt}
        imageBgColor={imageBgColor}
        fixed={imageFixed}
        aspectRatio={aspectRatio}
      />
      <CardText
        subtitle={subtitle}
        title={title}
        description={description}
        detail={detail}
        actionLabel={actionLabel}
        frame={frame}
        onClick={onClick}
      >
        {children}
      </CardText>
    </StyledCard>
  );
}
)
);

const StyledCard = styled(Stack, {
  shouldForwardProp: (prop) => prop !== 'frame',
})(({ theme, frame }) => ({
  containerType: 'inline-size',
  borderRadius: frame ? theme.sys.borderRadius.medium : 0,
  border: frame ? `1px solid ${theme.sys.outline.default}` : 'none',
  backgroundColor: frame ? theme.sys.color.surface : 'transparent',
}));



Card.displayName = 'Card';