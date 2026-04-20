'use client'

import styled from "@emotion/styled";
import Link from "next/link";
import { Header } from "@/widgets/Header";
import { Stack } from "@/shared/uiKit/Stack";
import { Logo, Play } from "@/games/dotByDot";
import { Bubbles } from "@/games/dotByDot";
import { ThemeProvider } from "@/shared/theme";

export default function GamesHome() {

  return (
    <ThemeProvider mode='dark'>
      <StyledPage>
        <Header rightSlot={false} />
        <Stack
          direction="column"
          gap={10}
          height='fit'
          padding={10}
          zIndex={1}
        >
          <Logo />
          <Link href="/games/dotbydot"> <Play /> </Link>
        </Stack>
        <StyledDesktopBubbles> <Bubbles numBalls={50} /> </StyledDesktopBubbles>
        <StyledMobileBubbles> <Bubbles numBalls={20} /> </StyledMobileBubbles>
      </StyledPage>
    </ThemeProvider>
  );
}

const StyledMobileBubbles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  theme: ${({ theme }) => theme.sys.color.surface};
`;

const StyledDesktopBubbles = styled.div`
  display: none;
  ${({ theme }) => theme.media.min.medium} {
    display: block;
  }
`;

const StyledPage = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  
  background-color: ${({ theme }) => theme.sys.color.surface};
`;
