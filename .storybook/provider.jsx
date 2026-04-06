import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../src/shared/providers/theme';
import { store } from '../src/app/store';

export const withProviders = (Story, context) => {
  const isDark = context.globals.theme === 'dark';
  const backgroundColor = isDark ? '#111' : '#FFFFFF';

  const storyElement = React.createElement(Story);

  const divWrapperElement = React.createElement('div', {
     style: {
        minHeight: 'calc(100vh - 32px)',
        background: backgroundColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
      }
    },
    storyElement
  );

  const themeProviderElement = React.createElement(ThemeProvider, {
    forceDark: isDark,
    children: divWrapperElement
  });

  const providerElement = React.createElement(Provider, {
    store: store,
    children: themeProviderElement
  });

  return providerElement;
};
