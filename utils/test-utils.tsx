import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render, RenderOptions } from '@testing-library/react-native';
// eslint-disable-next-line import/extensions
import { ThemeProvider } from 'components/ThemeContext';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

// eslint-disable-next-line import/no-extraneous-dependencies
export * from '@testing-library/react-native';

export { customRender as render };
