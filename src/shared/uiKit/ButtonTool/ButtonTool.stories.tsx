import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { ButtonTool } from './ButtonTool';
import { ButtonToolGroup } from './ButtonToolGroup';
import { ButtonToolToggle } from './ButtonToolToggle';
import { ButtonToolMultiToggle } from './ButtonToolMultiToggle';
import { CrossIcon } from '@/shared/icons';

export interface ButtonToolProps {
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  variant?: 'blank' | 'lite' | 'filled';
  size?: 'small' | 'medium' | 'large';
  rounded?: 'none' | 'all' | 'left' | 'right';
  width?: string;
  isSelected?: boolean;
  isFocused?: boolean;
  isHovered?: boolean;
  focus?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  customBgColor?: string;
  customIconColor?: string;
  value?: string;
}

const meta = {
  title: 'Atoms/ButtonTool',
  component: ButtonTool,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: ['default', 'primary', 'success', 'warning', 'error'] },
    variant: { control: 'select', options: ['blank', 'lite', 'filled'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    rounded: { control: 'select', options: ['none', 'all', 'left', 'right'] },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<ButtonToolProps>;

export default meta;
type Story = StoryObj<ButtonToolProps>;

export const Default: Story = {
  args: {
    color: 'default',
    variant: 'filled',
    children: <CrossIcon />,
  },
};

export const Selected: Story = {
  args: {
    color: 'default',
    variant: 'filled',
    isSelected: true,
    children: <CrossIcon />,
  },
};

export const Disabled: Story = {
  args: {
    color: 'default',
    variant: 'filled',
    disabled: true,
    children: <CrossIcon />,
  },
};

export const Group: Story = {
  render: () => (
    <ButtonToolGroup>
      <ButtonTool>
        <CrossIcon />
      </ButtonTool>
      <ButtonTool>
        <CrossIcon />
      </ButtonTool>
      <ButtonTool>
        <CrossIcon />
      </ButtonTool>
    </ButtonToolGroup>
  ),
};

export const Toggle: Story = {
  render: () => {
    const [value, setValue] = useState('1');
    return (
      <ButtonToolToggle value={value} onChange={setValue} style="primary" size="small">
        <ButtonTool value="1">
          <CrossIcon />
        </ButtonTool>
        <ButtonTool value="2">
          <CrossIcon />
        </ButtonTool>
        <ButtonTool value="3">
          <CrossIcon />
        </ButtonTool>
      </ButtonToolToggle>
    );
  },
};

export const MultiToggle: Story = {
  render: () => {
    const [value, setValue] = useState(['1']);
    return (
      <ButtonToolMultiToggle value={value} onChange={setValue} color="primary" size="small">
        <ButtonTool value="1">
          <CrossIcon />
        </ButtonTool>
        <ButtonTool value="2">
          <CrossIcon />
        </ButtonTool>
        <ButtonTool value="3">
          <CrossIcon />
        </ButtonTool>
      </ButtonToolMultiToggle>
    );
  },
};
