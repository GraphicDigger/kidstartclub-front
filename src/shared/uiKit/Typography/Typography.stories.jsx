import React from 'react';
import { Typography } from './Typography';

export default {
    title: 'uiKit/Typography',
    component: Typography,
};

const Template = (args) => (

    <Typography {...args}>
        Hello World
    </Typography>
);

export const Default = Template.bind({});

Default.args = {};


