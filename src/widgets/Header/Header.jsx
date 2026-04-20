'use client'
import { SlotBar, LeftSlot, RightSlot, CenterSlot } from '../../shared/uiKit/SlotBar';
import { Logo } from '../../shared/uiKit/Logo';
import styled from '@emotion/styled';
import Link from 'next/link';
import { Typography } from '@/shared/uiKit/Typography';
import { Stack } from '@/shared/uiKit/Stack';

export const Header = () => {

    return (
        <StyledHeader >
            <SlotBar>
                <LeftSlot>
                </LeftSlot>
                <CenterSlot>
                    <Logo />
                </CenterSlot>
                <RightSlot>
                    <Stack direction="row" gap={5}>
                    <Link href="/book-club">
                        <Typography variant="body.small">
                                Книжный клуб
                        </Typography>
                    </Link>
                    <Link href="/games">
                        <Typography variant="body.small">
                            Игры
                        </Typography>
                    </Link>
                    <Link href="/proforentation">
                        <Typography variant="body.small">
                            Профориентация
                        </Typography>
                    </Link>
                    </Stack>
                </RightSlot>
            </SlotBar>
        </StyledHeader>
    )
};

const StyledHeader = styled.header` 

        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        background-color: ${({ theme }) => theme.sys.color.surface};

`;