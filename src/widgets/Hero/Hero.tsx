'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { Stack } from '../../shared/uiKit/Stack'
import { gsap } from 'gsap'
import { Typography } from '../../shared/uiKit/Typography'

interface HeroProps {
    src: string
    alt: string
    title?: string
    subtitle?: string
    children: React.ReactNode
    childPosition?: 'top' | 'center' | 'bottom'
}

export const Hero = ({
    src,
    alt,
    title,
    subtitle,
    childPosition = 'center',
    children
}: HeroProps) => {

    const position = {
        top: { alignX: 'center', alignY: 'start' },
        center: { alignX: 'center', alignY: 'center' },
        bottom: { alignX: 'center', alignY: 'end' }
    } as const;

    const { alignX, alignY } = position[childPosition];


    const imageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!imageRef.current) return

        const ctx = gsap.context(() => {
            gsap.to(imageRef.current, {
                scale: 1.1,
                duration: 20,
                ease: 'power1.inOut',
                repeat: -1,
                yoyo: true
            })
        })

        return () => ctx.revert()
    }, [])

    return (
        <Stack
            direction="column"
            alignX={alignX}
            alignY={alignY}
            width="full"
            height="full"
            style={{ position: 'relative', overflow: 'hidden' }}
            gap={10}
            padding={8}
        >
            <div
                ref={imageRef}
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 0
                }}
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    priority
                    style={{ objectFit: 'cover' }}
                />
            </div>

            <Typography
                variant="display.large"
                tag="h1"
                color="#FFFFFF"
                style={{ position: 'relative', zIndex: 1 }}
                align="center"
            >
                {title}
            </Typography>

            <Typography
                variant="caps.medium"
                tag="p"
                color="#FFFFFF"
                style={{ position: 'relative', zIndex: 1 }}
                align="center"
            >
                {subtitle}
            </Typography>


            <Stack
                paddingBottom={15}
                style={{ position: 'relative', zIndex: 1, display: 'contents' }}
            >
                {children}
            </Stack>
        </Stack>
    );
};
