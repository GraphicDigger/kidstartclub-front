import React from 'react';
import { Card, CardProps } from './Card';
import { TopSlot } from './TopSlot';
import { BottomSlot } from './BottomSlot';


export default {
  title: 'uiKit/Card',
  component: Card,
};

export const Default = {
  render: (args: CardProps) => (
    <Card {...args}>
      <TopSlot />
      <BottomSlot />
    </Card>
  ),
  args: {
    width: 520,
    imageSrc: '/cover-example.jpg',
    imageAlt: '',
    subtitle: 'Subtitle',
    title: 'Book Title',
    description: 'Description',
    detail: 'Detail',
    actionLabel: 'Button',
    frame: true,
  },
};

export const Small = {
  args: {
    ...Default.args,
    width: 320,
  },
};

export const WithFrame = {
  render: (args: CardProps) => (
    <div style={{ display: 'flex', gap: 40, padding: 40 }}>

      <Card {...args}
        width={320}
      />
      <Card {...args}
        width={320}
        frame={false}
        subtitle={undefined}
        title={undefined}
        imageFixed={false}
      />

    </div>
  ),
  args: {
    ...Default.args,
  },
};