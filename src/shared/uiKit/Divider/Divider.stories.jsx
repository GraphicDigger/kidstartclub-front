import React from 'react';
import { Divider } from './Divider';


export default {
    title: 'uiKit/Divider',
    component: Divider,
};

const Template = (args) => {
    return (
        <div style={{ display: 'flex', width: '100px', height: '100px' }}>
            <Divider {...args} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    orientation: 'horizontal',
};


