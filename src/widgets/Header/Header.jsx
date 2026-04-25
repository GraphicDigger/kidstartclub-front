'use client'
import { SlotBar, LeftSlot, RightSlot, CenterSlot } from '../../shared/uiKit/SlotBar';
import { Logo } from '../../shared/uiKit/Logo';
import styled from '@emotion/styled';
import Link from 'next/link';
import { Typography } from '@/shared/uiKit/Typography';
import { Stack } from '@/shared/uiKit/Stack';
import { ButtonTool } from '@/shared/uiKit/ButtonTool';
import { BurgerIcon } from '@/shared/icons';
import { Dialog, DialogTrigger, DialogContent } from '@/shared/uiKit/Dialog';

const list = [
    {
        title: "Книжный клуб",
        href: "/book-club"
    },
    {
        title: "Игры",
        href: "/games"
    },
    {
        title: "Профориентация",
        href: "/proforentation"
    }
]

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
                    <MenuSlyled>
                        <Stack direction="row" gap={5}>
                            {list.map((item) => (
                                <Link href={item.href} key={item.title}>
                                    <Typography variant="body.small">
                                        {item.title}
                                    </Typography>
                                </Link>
                            ))}
                        </Stack>
                    </MenuSlyled>
                    <BurgerMenuStyled>
                        <Dialog>
                            <DialogTrigger asChild>
                                <ButtonTool color="primary">
                                    <BurgerIcon size="m" />
                                </ButtonTool>
                            </DialogTrigger>
                            <DialogContent fullscreen>
                                <Stack direction="column" gap={4} padding={4}>
                                    {list.map((item) => (
                                        <Link href={item.href} key={item.title}>
                                            <Typography variant="headline.medium">
                                                {item.title}
                                            </Typography>
                                        </Link>
                                    ))}
                                </Stack>
                            </DialogContent>
                        </Dialog>
                    </BurgerMenuStyled>

                </RightSlot>
            </SlotBar>
        </StyledHeader>
    )
};

const MenuSlyled = styled.div`
    display: block;
    @media (max-width: 768px) {
        display: none;
    }
`;

const BurgerMenuStyled = styled.div`
    display: none;
    @media (max-width: 768px) {
        display: block;
    }
`;

const StyledHeader = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: ${({ theme }) => theme.sys.color.surface};
`;