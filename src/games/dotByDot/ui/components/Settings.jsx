'use client'
import { Stack } from '@/shared/uiKit/Stack';
import styled from '@emotion/styled';
import { Card } from '@/shared/uiKit/Card';
import { Scrolling } from '@/shared/uiKit/Scrolling';
import { Typography } from '@/shared/uiKit/Typography';
import { useKeyboard } from '@/shared/lib/useKeyboard';
import { Button } from '@/shared/uiKit/Button';
import { ArrowLeftIcon, ArrowLeftCloseIcon } from '@/shared/icons';
import { SlotBar, RightSlot } from '@/shared/uiKit/SlotBar';
import { useSpecificationMode } from '../../model';
import { Instruction } from './instructionSteps'

export const Settings = () => {

    const { resetSpecificationMode } = useSpecificationMode()

    useKeyboard({
        onEscape: resetSpecificationMode,
    })

    return (
        <StyledSpecification >
            <Scrolling
                spacingTop={60}
                spacingBottom={20}
                height="100vh"
            >
                <Stack
                    align="start"
                    justify="start"
                    height="fit"
                    padding={6}
                    gap={10}
                >
                    <Instruction />
                </Stack>
            </Scrolling>
            <StyledSlotBar>
                <RightSlot>
                    <Button
                        onClick={resetSpecificationMode}
                        color="primary"
                        variant="filled"
                        size="large"
                        startIcon={<ArrowLeftCloseIcon />}
                    />
                </RightSlot>
            </StyledSlotBar>
            <StyledCloseButtonMobile>
                <Button
                    onClick={resetSpecificationMode}
                    color="primary"
                    variant="filled"
                    size="large"
                    startIcon={<ArrowLeftIcon />}
                />
            </StyledCloseButtonMobile>
        </StyledSpecification>
    );
};

const StyledSpecification = styled.div`
    position: relative;
    height: 100vh;
    width: 30vw;
    overflow: hidden;
    outline: 2px solid ${({ theme }) => theme.sys.color.surfaceContainer.low};
    background-color: ${({ theme }) => theme.sys.color.surface};

    ${({ theme }) => theme.media.max.xxlarge} {
        width: 40vw;
    }

    ${({ theme }) => theme.media.max.xlarge} {
        width: 50vw;
    }

    ${({ theme }) => theme.media.max.medium} {
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        height: 100dvh;
        z-index: ${({ theme }) => theme.sys.zIndex.layers.baseUI};
    }

`;

const StyledCloseButtonMobile = styled.div`
    display: none;
    position: absolute;
    bottom: calc(20px + env(safe-area-inset-bottom, 0px));
    left: 50%;
    transform: translateX(-50%);
    z-index: ${({ theme }) => theme.sys.zIndex.layers.floating};
    ${({ theme }) => theme.media.max.medium} {
        display: block;
    }
`;

const StyledSlotBar = styled(SlotBar)`
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    z-index: ${({ theme }) => theme.sys.zIndex.layers.floating};
    ${({ theme }) => theme.media.max.medium} {
        display: none;
    }
`;