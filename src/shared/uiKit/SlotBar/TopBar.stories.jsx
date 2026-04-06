import React from 'react';
import { TopBar } from './SlotBar';
import { LeftSlot } from './LeftSlot';
import { CenterSlot } from './CenterSlot';
import { RightSlot } from './RightSlot';

export default {
    title: 'Atoms/TopBar',
    component: TopBar,
};

const Template = (args) => {
    return (
        <div style={{ display: 'flex', width: '1000px'}}>
            <TopBar {...args}>
                <LeftSlot>
                    <p>Left Slot</p>
                </LeftSlot>
                <CenterSlot>
                    <p>Center Slot</p>
                </CenterSlot>
                <RightSlot>
                    <p>Right Slot</p>
                </RightSlot>
            </TopBar>
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
};




