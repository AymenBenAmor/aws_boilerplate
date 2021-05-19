import * as React from 'react';
import Home from '../Home';

import { render } from '../../../utils/test-utils';

jest.useFakeTimers();

describe('<Home />', () => {
  const updateAuth = jest.fn();
  /* eslint-disable @typescript-eslint/no-explicit-any  */
  const navigation: any = jest.fn();
  const component = (
    <Home updateAuthState={updateAuth} navigation={navigation} />
  );
  it('page contains home text', async () => {
    const { getByText } = render(component);
    expect(await getByText('React Native + Amplify')).toBeDefined();
  });
});
