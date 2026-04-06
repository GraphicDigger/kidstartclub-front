'use client'
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { ThemeProvider } from '@/shared/providers/theme';
import { Scrolling } from '@/shared/uiKit/Scrolling';
import { Confetti } from '@/shared/assets';
import { Dialog, DialogContent } from '@/shared/uiKit/Dialog';
import { Stack } from '@/shared/uiKit/Stack';
import { ResetGameIcon, SettingsIcon, HomeIcon } from '@/shared/icons';

import { useDots, useSpecificationMode } from '../model';
import { TOTAL_ROWS } from '../const';
import { Row, TargetColors, Settings } from './components';


export const Playground = () => {
    return (
        <ThemeProvider mode='dark'>
            <Content />
        </ThemeProvider>
    )
}

const Content = () => {

    const theme = useTheme()

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const { resetGame, isGameWon, isGameDone } = useDots()
    const { toggleSpecificationMode, isSpecificationMode } = useSpecificationMode()

    const handleToggleDialog = useCallback(() => {
        if (isGameWon) resetGame()
        setIsDialogOpen(prev => !prev)
    }, [isGameWon, resetGame])

    const handleToggleSpecificationMode = useCallback(() => {
        toggleSpecificationMode()
    }, [toggleSpecificationMode])

    const handleResetGame = useCallback(() => {
        resetGame()
    }, [resetGame])

    useEffect(() => {
        resetGame()
    }, [resetGame])

    useEffect(() => {
        if (isGameWon) {
            setTimeout(() => {
                setIsDialogOpen(true)
            }, 2000)
        }
    }, [isGameWon])


    return (
        <StyledContainer>
            <StyledPlayground>
                {isGameWon && <Confetti />}
                <TargetColors />
                <Dialog
                    open={isDialogOpen}
                    onOpenChange={handleToggleDialog}
                    modal
                >
                    <DialogContent
                        title="Поздравляем!"
                        hasOverlay={true}
                        hasCloseButton={false}
                        onClose={handleToggleDialog}
                    >
                        <Stack direction="column" gap={10}>
                            <p>Отличная работа! Вы разгадали код!</p>
                        </Stack>
                    </DialogContent>
                </Dialog>
                <Scrolling spacingTop='20vh' start='bottom'>
                    <StyledDotsContainer>
                        {[...Array(TOTAL_ROWS)].map((_, rowIndex) => (
                            <Row
                                key={`row-${rowIndex}`}
                                rowIndex={rowIndex}
                            />
                        ))}
                        <Stack direction='row' gap={4}>
                            <Link href="/">
                                <StyledRestartButton onClick={handleResetGame}>
                                    <HomeIcon size='l' color={theme.sys.color.onSurfaceVariant} />
                                </StyledRestartButton>
                            </Link>
                            <StyledRestartButton onClick={handleResetGame}>
                                <ResetGameIcon size='l' color={theme.sys.color.onSurfaceVariant} />
                            </StyledRestartButton>
                            <StyledRestartButton onClick={handleToggleSpecificationMode} >
                                <SettingsIcon size='l' color={theme.sys.color.onSurfaceVariant} />
                            </StyledRestartButton>
                        </Stack>
                    </StyledDotsContainer>
                </Scrolling>
            </StyledPlayground>
            {isSpecificationMode && <Settings />}
        </StyledContainer>
    );
};


const StyledContainer = styled.div`
    display: contents;
    position: relative;
`;

const StyledPlayground = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    flex: 1;
    background-color: ${({ theme }) => theme.sys.color.surface};

`;


const StyledDotsContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 100%;
`;

const StyledRestartButton = styled.div`
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.sys.color.surfaceContainer.low};
    border-radius: 50%;
    width: 80px;
    height: 80px; 
    margin: 20vh 0 20vh
`