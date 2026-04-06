import React from 'react';
import styled from '@emotion/styled';
import { Backdrop } from './Backdrop';

export default {
    title: 'uiKit/Backdrop',
    component: Backdrop,
};

const Template = (args) => {
    return (
        <StyledContainer>
            <Backdrop {...args} />
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    width: 400px;
    height: 400px;
    
`;

export const Default = Template.bind({});
Default.args = {

};


