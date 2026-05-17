'use client';
import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { Stack } from '../Stack';
import gsap from 'gsap';

interface GradientContainerProps extends React.ComponentProps<typeof Stack> {
    $border?: boolean;
}

const StyledStack = styled(Stack, {
    shouldForwardProp: (prop) => prop !== '$border',
})<{ $border?: boolean }>(({ theme, $border }) => ({
    position: 'relative',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
    zIndex: 0,
    WebkitMaskImage: '-webkit-radial-gradient(white, black)',
    backgroundColor: $border ? theme.sys.color.surface : 'transparent',
}));

const GradientLayer = styled.div({
    position: 'absolute',
    inset: 0,
    zIndex: -2,
    backgroundColor: '#9747FF',
    backgroundImage: [
        // `radial-gradient(ellipse 120% 240% at var(--b1-x, 10%) var(--b1-y, 50%), #1D9FE0cc, transparent 40%)`,
//         `radial-gradient(ellipse 110% 300% at var(--b3-x, 90%) var(--b3-y, 90%), #42BD46cc, transparent 65%)`,
        `radial-gradient(ellipse 100% 300% at var(--b2-x, 90%) var(--b2-y, 10%), #f01eaacc, transparent 65%)`,
        // `radial-gradient(ellipse 90%  200%  at var(--b4-x, 80%) var(--b4-y, 70%), #1D9FE0cc, transparent 65%)`,
    ].join(', '),
});

const InnerFill = styled.div(({ theme }) => ({
    position: 'absolute',
    zIndex: -1,
    inset: '3px',
    backgroundColor: theme.sys.color.surface,
    borderRadius: '9999px',
}));

export const GradientContainer = ({ $border = true, children, ...props }: GradientContainerProps) => {
    const layerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = layerRef.current;
        if (!el) return;

        const anims = [
            gsap.to(el, { '--b1-x': '85%', '--b1-y': '15%', duration: 7,  repeat: -1, yoyo: true, ease: 'sine.inOut' }),
            gsap.to(el, { '--b2-x': '10%', '--b2-y': '75%', duration: 9,  repeat: -1, yoyo: true, ease: 'power1.inOut' }),
            gsap.to(el, { '--b3-x': '70%', '--b3-y': '20%', duration: 11, repeat: -1, yoyo: true, ease: 'sine.inOut' }),
            gsap.to(el, { '--b4-x': '20%', '--b4-y': '30%', duration: 8,  repeat: -1, yoyo: true, ease: 'power2.inOut' }),
        ];

        return () => anims.forEach(a => a.kill());
    }, []);

    return (
        <StyledStack $border={$border} {...props}>
            <GradientLayer ref={layerRef} />
            {$border && <InnerFill />}
            {children}
        </StyledStack>
    );
};
