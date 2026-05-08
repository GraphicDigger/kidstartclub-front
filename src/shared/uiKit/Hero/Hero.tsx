"use client";
import React, { use } from 'react'
import classNames from 'classnames'
import { Stack } from '../Stack'
import { Image } from '../Image'
import { Typography } from '../Typography'
import styles from './Hero.module.scss'
import styled from '@emotion/styled';

interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string
    alt?: string
    title?: string
    subtitle?: string
    backgroundColor?: string
    height?: 'fill' | 'fit' | number | 'full'
    width?: 'fill' | 'fit' | number | 'full'
    children?: React.ReactNode
    align?: 'top' | 'center' | 'bottom' | 'left' | 'right'
    contentWidth?: 'fit' | 'fill' | number
}

export const Hero = ({
    src,
    alt,
    title,
    subtitle,
    backgroundColor = '#e0e0e0',
    height = 'full',
    width = 'full',
    align = 'center',
    contentWidth = 'fit',
    children,
    className,
    ...props
}: HeroProps) => {

    const contentAlign = {
        top: { alignX: 'center', alignY: 'start' },
        center: { alignX: 'center', alignY: 'center' },
        bottom: { alignX: 'center', alignY: 'end' },
        left: { alignX: 'start', alignY: 'center' },
        right: { alignX: 'end', alignY: 'center' },
    } as const;

    const textAlign = align === 'left' || align === 'right' ? align : 'center';

    const contentWidthValue = (contentWidth === 'fit' || contentWidth === 'fill' || typeof contentWidth === 'number') ? contentWidth : 'fit';

    const { alignX, alignY } = contentAlign[align as keyof typeof contentAlign] || contentAlign.center;

    return (
        <HeroContainer
            width={width}
            height={height}
            backgroundColor={backgroundColor}
            padding={4}
            className={classNames(styles.heroContainer, className)}
            {...props}
        >
            {src && (
                <div className={styles.imageWrapper}>
                    <Image
                        src={src}
                        alt={alt || ''}
                        fill
                        className={styles.heroImage}
                    />
                </div>
            )}

            <Stack
                direction="column"
                maxWidth={contentWidthValue}
                alignX={alignX}
                alignY={alignY}
                gap={10}
                style={{ position: 'relative' }}
            >
                {title && (
                    <Typography
                        variant="display.large"
                        tag="h1"
                        color="#FFFFFF"
                        align={textAlign}
                    >
                        {title}
                    </Typography>
                )}

                {subtitle && (
                    <Typography
                        variant="caps.medium"
                        tag="p"
                        color="#FFFFFF"
                        align={textAlign}
                    >
                        {subtitle}
                    </Typography>
                )}

                {children && children}
            </Stack>
        </HeroContainer>
    );

};

const HeroContainer = styled(Stack)`
    @media (max-width: 768px) {
        height: max-content !important;
    }
`;
