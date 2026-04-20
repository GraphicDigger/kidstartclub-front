import type { Meta, StoryObj } from '@storybook/react';
import { Empty } from './Empty';

const meta: Meta<typeof Empty> = {
  title: 'Atoms/Empty',
  component: Empty,
  tags: ['autodocs'],
  argTypes: {
    height: {
      control: 'text',
      description: 'CSS height value',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Empty>;

export const Default: Story = {};

export const FixedHeight: Story = {
  args: {
    height: '120px',
  },
};

export const CustomHeight: Story = {
  args: {
    height: '200px',
  },
  decorators: [
    (StoryComponent) => (
      <div style={{ width: '300px' }}>
        <StoryComponent />
      </div>
    ),
  ],
};
