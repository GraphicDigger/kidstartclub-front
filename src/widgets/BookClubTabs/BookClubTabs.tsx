'use client'
import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { ScrollArea } from "@/shared/uiKit/ScrollArea";
import { Stack } from "@/shared/uiKit/Stack";
import { Button } from '@/shared/uiKit/Button';

interface BookClubTabsProps {
    tabs: { label: string; value: string; href: string }[];
    activeValue: string;
}

export const BookClubTabs = ({ tabs, activeValue }: BookClubTabsProps) => {
    const activeTabRef = useRef<HTMLDivElement>(null);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const performScroll = (behavior: 'auto' | 'smooth' = 'smooth') => {
            const el = activeTabRef.current;
            const container = scrollAreaRef.current;
            
            if (!el || !container) return;

            const elRect = el.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            // Расчет: текущий скролл + смещение элемента относительно контейнера - половина ширины контейнера + половина ширины элемента
            const targetScrollLeft = container.scrollLeft + (elRect.left - containerRect.left) - (containerRect.width / 2) + (elRect.width / 2);

            if (container.scrollTo) {
                container.scrollTo({
                    left: targetScrollLeft,
                    behavior
                });
            } else {
                container.scrollLeft = targetScrollLeft;
            }
        };

        // На iOS 15 часто случаются race conditions с лайаутом.
        // Мы делаем несколько попыток: одну мгновенную и пару с задержкой.
        const timer1 = setTimeout(() => performScroll('auto'), 100);
        const timer2 = setTimeout(() => performScroll('smooth'), 400);
        const timer3 = setTimeout(() => performScroll('smooth'), 1000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [activeValue]);

    return (
        <StyledSticky>
            <ScrollArea orientation="horizontal" ref={scrollAreaRef}>
                <Stack height="fill" alignX="start">
                    <Container>
                        <Stack
                            direction="row"
                            gap={2}
                            alignY="center"
                            height="fit"
                            width="fit"
                        >
                            {tabs.map((tab) => {
                                const isActive = activeValue === tab.value;
                                return (
                                    <div
                                        key={tab.value}
                                        ref={isActive ? activeTabRef : null}
                                        style={{ display: 'flex' }}
                                    >
                                        <Link href={tab.href} style={{ display: 'contents' }}>
                                            <Button color={isActive ? 'primary' : 'default'}>
                                                {tab.label}
                                            </Button>
                                        </Link>
                                    </div>
                                );
                            })}
                        </Stack>
                    </Container>
                </Stack>
            </ScrollArea>
        </StyledSticky>
    );
};

const Container = ({ children, ...props }: { children: React.ReactNode;[key: string]: any }) => {
    return (
        <Stack
            maxWidth={1200}
            height="fit"
            alignY="start"
            alignX="start"
            gap={7}
            padding={4}
            {...props}
        >
            {children}
        </Stack >
    )
}

const StyledSticky = styled.div`
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: ${({ theme }: any) => theme.sys.color.surface};
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
`;
