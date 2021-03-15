import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render, RenderOptions } from '@testing-library/react-native';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
// eslint-disable-next-line import/extensions
import theme from '../theme.json';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      {children}
    </ApplicationProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

// eslint-disable-next-line import/no-extraneous-dependencies
export * from '@testing-library/react-native';

export { customRender as render };
