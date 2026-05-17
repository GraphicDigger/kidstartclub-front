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

    useEffect(() => {
        if (activeTabRef.current) {
            const timer = setTimeout(() => {
                activeTabRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [activeValue]);

    return (
        <StyledSticky>
            <ScrollArea orientation="horizontal">
                <Stack height="fill" >
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
