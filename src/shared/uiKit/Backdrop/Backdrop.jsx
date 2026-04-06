/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { getPositionStyles } from './Backdrop.style';


export const Backdrop = ({
    children,
    opacity = 0.4,
    onClick,
    zIndex = 1000,
    ignorePointer = false,
    contentPosition = 'center',
}) => {

    const handleClick = (e) => {
        if (onClick) onClick();
        e.stopPropagation();
    };

    return (
        <StyledContainer
            ignorePointer={ignorePointer}
            contentPosition={contentPosition}
            onClick={e => handleClick(e)}
            zIndex={zIndex}
        >
            <StyledContent>
                {children}
            </StyledContent>
            <StyledOverlay opacity={opacity} />
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    pointer-events: ${({ ignorePointer }) => ignorePointer ? 'none' : 'auto'};
    justify-content: ${({ contentPosition }) => getPositionStyles(contentPosition).justify};
    align-items: ${({ contentPosition }) => getPositionStyles(contentPosition).align};
    z-index: ${({ zIndex }) => zIndex};
`;

const StyledContent = styled.div`
    display: contents;
    position: relative;
    z-index: 1;
`;

const StyledOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000000
    z-index: 0;
    opacity: ${({ opacity }) => opacity};
`;

Backdrop.propTypes = {
    opacity: PropTypes.number,
    onClick: PropTypes.func,
    children: PropTypes.node,
    contentPosition: PropTypes.oneOf(['center', 'left', 'right']),
};
