'use client'
import styled from '@emotion/styled';

export const SlotBar = ({ children, className, ...props }) => {
    return (
        <StyledSlotBar className={className} {...props}>
            {children}
        </StyledSlotBar>
    );
};

const StyledSlotBar = styled.div`
    position: relative;
    width: 100%;
    min-height: 44px;
    height: max-content;
`;