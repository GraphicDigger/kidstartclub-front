'use client'

import React from 'react'
import styled from '@emotion/styled'

import { Typography } from '../Typography'
import { Stack } from '../Stack'

interface CardTextProps {
    subheadline?: React.ReactNode;
    headline?: React.ReactNode;
    description?: React.ReactNode;
    detail?: React.ReactNode;
    actionLabel?: React.ReactNode;
    onAction?: () => void;
    frame?: boolean;
    descriptionLines?: number;
}

export const CardText = ({
    subheadline,
    headline,
    description,
    frame,
    descriptionLines = 4,
}: CardTextProps) => {
    return (
        <ContainerStyled frame={frame}>
            <Stack
                direction="column"
                gap={2}
                alignX="start"
                alignY="start"
            >
                {subheadline && (
                    <Typography variant="body.small" tag="p">{subheadline}</Typography>
                )}
                {headline && (
                    <TitleStyled tag="h3">{headline}</TitleStyled>
                )}
                {description && (
                    <DescriptionStyled tag="p" $lines={descriptionLines}>{description}</DescriptionStyled>
                )}
            </Stack>
        </ContainerStyled>
    )
}

const ContainerStyled = styled('div')<{ frame?: boolean }>(({ theme, frame }) => ({
    width: '100%',
    height: '100%',
}));

const TitleStyled = styled(Typography)(({ theme }) => ({
     ... theme.sys.typography.headline?.medium,
    '@container (max-width: 400px)': {
        ... theme.sys.typography.headline?.small,
    },
}));

const DescriptionStyled = styled(Typography, { shouldForwardProp: (prop) => prop !== '$lines' })<{ $lines: number }>(({ theme, $lines }) => ({
    ... theme.sys.typography.body?.medium,
    display: '-webkit-box',
    WebkitLineClamp: $lines,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    '@container (max-width: 400px)': {
        ... theme.sys.typography.body?.small,
    },
}));
