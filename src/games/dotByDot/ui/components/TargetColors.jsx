import { Dot } from '../uiKit';
import { useDots } from '../../model';
import styled from '@emotion/styled';

export const TargetColors = ({ onClick }) => {

    const { targetColors } = useDots();

    return (

        <StyledContainer onClick={onClick}>
            {targetColors.map((color, index) => (
                <Dot
                    key={`target-${index}`}
                    color={color}
                    size={40}
                />

            ))}
        </StyledContainer>

    );
};

const StyledContainer = styled.div`
    display: flex;
    flex-direction: row;
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    width: max-content;
    height: max-content;
    z-index: 1000;
    gap: 4px;
    border-radius: 40px;
    padding: 6px;
    overflow: hidden;
    border: 1px solid #333;
`;

const StyledDot = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #111;
`;
