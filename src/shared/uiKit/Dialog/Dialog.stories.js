import React from 'react';
import styled from '@emotion/styled';
import { Dialog, DialogTrigger, DialogContent } from './Dialog';
import { Typography } from '../Typography';
import { Button } from '../Button';

export default {
    title: 'uiKit/Dialog',
    component: Dialog,
};

const Template = (args) => {
    return (
        <StyledContainer>
            <Dialog>
                <DialogTrigger>
                    <Button color="primary" variant="lite" size="small">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                    <Typography variant="body.small">Dialog</Typography>
                    <Button>Close</Button>
                </DialogContent>
            </Dialog>
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


