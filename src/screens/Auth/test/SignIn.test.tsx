import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';

import { render } from '../../../../utils/test-utils';
import SignIn from '../SignIn';

jest.useFakeTimers();

describe('<SignIn />', () => {
  const updateAuth = jest.fn();
  /* eslint-disable @typescript-eslint/no-explicit-any  */
  const navigation: any = jest.fn();

  const component = (
    <SignIn updateAuthState={updateAuth} navigation={navigation} />
  );
  it('page contains sign in text', async () => {
    const { getByText } = render(component);
    expect(getByText('Sign in to your account')).toBeDefined();
  });

  it('shows invalid email error message', async () => {
    const { getByText, queryByTestId, getByTestId } = render(component);

    fireEvent.changeText(queryByTestId('SignIn.email'), 'gmail');
    fireEvent(getByTestId('SignIn.email'), 'blur');
    expect(getByText('Invalid email')).toBeDefined();
  });

  it('shows invalid password error message', async () => {
    const { getByText, queryByTestId, getByTestId } = render(component);

    fireEvent.changeText(queryByTestId('SignIn.password'), '1');
    fireEvent(getByTestId('SignIn.password'), 'blur');

    expect(getByText('Invalid password')).toBeDefined();
  });
});
