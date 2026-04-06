'use client'
import React from 'react';
import styled from '@emotion/styled';
import { Stack } from '@/shared/uiKit/Stack';
import { Header } from '@/shared/uiKit/Header';
import { Playground } from '@/games/dotByDot';

const DotByDotGame = () => {

  return (
    <>
      <StyledHeader> <Header /> </StyledHeader>
      <Stack direction="row">
        <Playground />
      </Stack>
    </>
  );
};

const StyledHeader = styled.div`
display: none;
${({ theme }) => theme.media.min.medium} {
    display: block;
  }
`;

export default DotByDotGame;
