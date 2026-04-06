'use client'
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';
import { Dot } from '../uiKit/Dot';
import { useDots } from '../../model';
import { Stack } from '@/shared/uiKit/Stack';
import { CodeStarIcon } from '@/shared/icons';

export const RowDot = ({
    rowIndex,
    colIndex,
    rowClicked,
    size
}) => {

    const theme = useTheme();

    const dotRef = useRef(null);
    const [hover, setHover] = useState(false);
    const [focus, setFocus] = useState(false);
    const cellId = `${rowIndex}-${colIndex}`;

    const {
        cellState,
        setColor,
        lastRowIndex,
        hasColor
    } = useDots(cellId)

    const { color, isDisabled } = cellState;

    const handleSetColor = () => {
        if (!isDisabled) {
            setColor(rowIndex, colIndex)
            setFocus(true)
        }
    };

    const handleMouseEnter = () => {
        setHover(true);
        gsap.to(dotRef.current, {
            scale: 0.9,
            duration: 0.1,
            ease: "power3.inOut",
        });
    };

    const handleMouseLeave = () => {
        setHover(false);
        gsap.to(dotRef.current, {
            scale: 1,
            duration: 0.1,
            ease: "power3.inOut",
        });
    };

    return (
        <StyledDot>
            <Dot
                size={size}
                onClick={handleSetColor}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                color={theme.sys.color.surfaceContainer.low}
            >
                {rowIndex === lastRowIndex && !color
                    ? <CodeStarIcon color={theme.sys.color.onSurface} />
                    : <Dot
                        size={!hasColor(rowIndex, colIndex) || !rowClicked ? 14 : size}
                        color={color}
                        disabled={isDisabled}
                    />
                }
            </Dot>
        </StyledDot>
    );
};

const StyledDot = styled.div`
    display: flex;
    flex-direction: row;
    padding: 8px;
    ${({ theme }) => theme.media.max.medium} {
        padding: 4px;
    }
`;
