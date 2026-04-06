'use client';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Stack } from '@/shared/uiKit/Stack';
import { Dot, Eye } from '../uiKit';
import { useDots } from '../../model';
import { CHECK_RESULTS } from '../../const';


export const RowCheckButton = ({ rowIndex, rowClicked, size }) => {
    
    const { colors, isRowComplete, shouldShowResults, checkAndSetResults } = useDots();

    const onCheck = async () => {
        await checkAndSetResults();
    };

    return (
        <Stack padding={2}>
            {shouldShowResults(rowIndex) ? (
                <Dot size={size} >
                    <Result rowIndex={rowIndex} colors={colors} />
                </Dot>
            ) : (
                <Dot
                    size="small"
                    onClick={onCheck}
                    disabled={!isRowComplete}
                >
                    {isRowComplete && rowClicked && <Eye />}
                </Dot>)}
        </Stack>
    );
};

export const Result = ({ rowIndex, colors }) => {

    const theme = useTheme();

    return (
        <StyledCheckGrid>
            {colors[`results-${rowIndex}`]?.map((result, i) => (
                <StyledCheck result={result} key={i} theme={theme} />
            ))}
        </StyledCheckGrid>
    );
};

const StyledCheckGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 20px);
    grid-template-rows: repeat(2, 20px);
    gap: 4px;
    justify-content: center;
    align-items: center;
    align-content: center;
    border-radius: 50%;
    rotate: 45deg;
    &:has(.check:nth-of-type(2):last-of-type) {
        grid-template-rows: 20px;
        grid-template-columns: repeat(2, 20px);
    }
    &:has(.check:nth-of-type(3):last-of-type) .check:last-of-type {
        grid-column: 1;
    }
`;

const StyledCheck = styled.div`
    border-radius: 50%;
    pointer-events: none;
    width: 18px;
    height: 18px;

    ${({ result }) => result === CHECK_RESULTS.EXACT && css`
        border: 6px solid white;
    `}
    ${({ result, theme }) => result === CHECK_RESULTS.EXISTS && css`
        background-color: ${theme.sys.color.surfaceContainer.default};
    `}
`;





