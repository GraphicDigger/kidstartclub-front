/** @type { import('@storybook/react').Preview } */
import '../src/app/globals.scss';
import { withProviders } from './provider'; // Импортируем декоратор



const preview = {
  parameters: {
    layout: 'fullscreen',
    actions: { argTypesRegex: '^on[A-Z].*' },
  },
  decorators: [withProviders],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'mirror',
        items: ['light', 'dark'],
      },
    },
  },
};

export default preview;

