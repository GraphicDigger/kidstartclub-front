import React from 'react';
import {Box} from './Box';


export default {
    title: 'uiKit/Layout/Box',
    component: Box,
};

const Template = (args) => {
    return (
        <>
            <Box {...args} />
        </>
    );
};

export const Default = Template.bind({});
Default.args = {

};


