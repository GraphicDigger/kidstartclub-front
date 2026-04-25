'use client';

import React, { memo, forwardRef, useMemo } from 'react';
import styled from '@emotion/styled';
import { Stack } from '../Stack';
import { CardCover } from './CardCover';
import { CardText } from './CardText';
import { TopSlot } from './TopSlot';
import { BottomSlot } from './BottomSlot';

function flattenValidElements(nodes: React.ReactNode): React.ReactElement[] {
  const out: React.ReactElement[] = []
  React.Children.forEach(nodes, (child) => {
    if (!React.isValidElement(child)) return
    if (child.type === React.Fragment) {
      const fragmentProps = (child as React.ReactElement<{ children?: React.ReactNode }>).props
      out.push(...flattenValidElements(fragmentProps.children))
      return
    }
    out.push(child)
  })
  return out
}

function isTopSlot(el: React.ReactElement) {
  return el.type === TopSlot
}

function isBottomSlot(el: React.ReactElement) {
  return el.type === BottomSlot
}


export interface CardProps {
  children?: React.ReactNode;
  className?: string;
  aspectRatio?: string | number;
  imageFixed?: boolean;
  height?: 'fill' | 'fit' | 'full' | number;
  width?: 'fill' | 'fit' | 'full' | number;
  imageSrc?: string;
  imageAlt?: string;
  subtitle?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  descriptionLines?: number;
  onAction?: () => void;
  imageBgColor?: string;
  frame?: boolean;
  maxWidth?: 'fill' | 'fit' | 'full' | number;
  onClick?: () => void;
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
  descriptionLines,

  imageSrc,
  imageFixed,
  aspectRatio,
  imageBgColor,
  imageAlt = '',

  onClick,
  className,
  ...props
},
  ref
) => {

  const slots = useMemo(() => {
    const result = {
      TopSlot: null as React.ReactElement | null,
      BottomSlot: null as React.ReactElement | null,
    }
    for (const child of flattenValidElements(children)) {
      if (isTopSlot(child)) result.TopSlot = child
      else if (isBottomSlot(child)) result.BottomSlot = child
    }
    return result
  }, [children])

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
      <ContentArea frame={frame}>
        <Area>
          {slots.TopSlot}
          <CardText
            subheadline={subtitle}
            headline={title}
            description={description}
            descriptionLines={descriptionLines}
            frame={frame}
          />
        </Area>
        {slots.BottomSlot && <BottomSlotArea>{slots.BottomSlot}</BottomSlotArea>}
      </ContentArea>
    </StyledCard>
  );
}));

const BottomSlotArea = styled('div')`
  padding-top: 20px;
`;

const ContentArea = styled('div', { shouldForwardProp: (prop) => prop !== 'frame' })<{ frame?: boolean }>(({ theme, frame }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: 0,
  padding: frame ? theme.sys.spacing.large : '20px 0 0 0',

}));

const Area = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

const StyledCard = styled(Stack, { shouldForwardProp: (prop) => prop !== 'frame' })<{ frame?: boolean }>(({ theme, frame }) => ({
  containerType: 'inline-size',
  borderRadius: frame ? theme.sys.borderRadius.medium : 0,
  border: frame ? `1px solid ${theme.sys.outline.default}` : 'none',
  backgroundColor: frame ? theme.sys.color.surface : 'transparent',
}));

Card.displayName = 'Card';
