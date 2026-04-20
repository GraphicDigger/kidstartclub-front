import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../src/shared/theme';
import { store } from '../src/app/store';

export const withProviders = (Story, context) => {
  const mode = context.globals.theme === 'dark' ? 'dark' : 'light';
  const backgroundColor = mode === 'dark' ? '#111' : '#FFFFFF';

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
    mode,
    children: divWrapperElement
  });

  const providerElement = React.createElement(Provider, {
    store: store,
    children: themeProviderElement
  });

  return providerElement;
};
