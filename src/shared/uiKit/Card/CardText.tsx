'use client'

import React, { useMemo } from 'react'
import Image from 'next/image'
import styled from '@emotion/styled'
import { Box } from '../Box'
import { Typography } from '../Typography'
import { Stack } from '../Stack'
import { Button } from '../Button'
import { TopSlot } from './TopSlot'
import { BottomSlot } from './BottomSlot'

/** Плоский список валидных элементов; Fragment разворачивается (иначе слоты внутри <> не находятся). */
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
    return el.type === TopSlot || (el.type as { displayName?: string }).displayName === TopSlot.displayName
}

function isBottomSlot(el: React.ReactElement) {
    return el.type === BottomSlot || (el.type as { displayName?: string }).displayName === BottomSlot.displayName
}

interface CardTextProps {
    subtitle?: React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
    detail?: React.ReactNode;
    actionLabel?: React.ReactNode;
    onAction?: () => void;
    frame?: boolean;
    children?: React.ReactNode;
}
export const CardText = ({
    subtitle,
    title,
    description,
    detail,
    actionLabel,
    onAction,
    frame,
    children,
}: CardTextProps) => {

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
        <ContainerStyled
            frame={frame}
        >
            <Stack
                direction="column"
                gap={2}
                alignX="start"
                alignY="start"
            >
                {slots.TopSlot}
                {subtitle && (
                    <Typography
                        variant="body.small"
                        tag="p"
                    >{subtitle}
                    </Typography>
                )}
                {title && (
                    <TitleStyled
                        variant="heading.small"
                        tag="h3"
                    > {title}
                    </TitleStyled>
                )}
                {description && (
                    <DescriptionStyled
                        variant="body.medium"
                        tag="p"
                    > {description}
                    </DescriptionStyled>
                )}
            </Stack>
            {slots.BottomSlot}
        </ContainerStyled>
    )
}

const ContainerStyled = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'frame',
  })(({ theme, frame }) => ({
    width: '100%',
    height: '100%',
  
    padding: frame ? theme.sys.spacing.large : '20px 0 0 0',
  
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '20px',
  }));

const TitleStyled = styled(Typography)(({ theme }) => ({
    '@container (max-width: 400px)': {
        fontSize: theme.sys.typography.heading?.xsmall?.fontSize,
    },
}));

const DescriptionStyled = styled(Typography)(({ theme }) => ({
    '@container (max-width: 400px)': {
        fontSize: theme.sys.typography.body?.small?.fontSize,
    },
}));
