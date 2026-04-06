import React from 'react';
import { Button } from './Button';
import { CodeStarIcon } from '../../icons';

export default {
  title: 'uiKit/Button',
  component: Button,
};

// Базовый шаблон кнопки
const Template = (args) => <Button {...args} />;

// Стандартная кнопка
export const Default = Template.bind({});
Default.args = {
  color: 'default',
  variant: 'filled',
  size: 'small',
  children: 'Подписаться',
  startIcon: <CodeStarIcon />,
};

export const ButtonIcon = Template.bind({});
ButtonIcon.args = {
  color: 'default',
  variant: 'filled',
  size: 'medium',
  startIcon: <CodeStarIcon />,
};
