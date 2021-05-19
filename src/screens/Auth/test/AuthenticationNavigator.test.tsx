import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { fireEvent } from '@testing-library/react-native';

import { render } from '../../../../utils/test-utils';
import AuthenticationNavigator from '../../../navigation/AuthenticationNavigator';

jest.useFakeTimers();

describe('<AuthenticationNavigator />', () => {
  const updateAuth = jest.fn();

  const component = (
    <NavigationContainer>
      <AuthenticationNavigator updateAuthState={updateAuth} />
    </NavigationContainer>
  );

  it('should go To signup when clicking on signup button', async () => {
    const { getByText } = render(component);
    await fireEvent.press(getByText("Don't have an account? Sign Up"));
    expect(getByText('Sign Up')).toBeDefined();
  });

  it('should go To ForgotPassword when clicking on forgot password button', async () => {
    const { getByText } = render(component);
    await fireEvent.press(getByText('Forgot Password ?'));
    expect(getByText('Forgot Password')).toBeDefined();
  });

  it('should go back to SignIn when clicking on go back in Forgot Password', async () => {
    const { getByText, queryByTestId } = render(component);
    await fireEvent.press(getByText('Forgot Password ?'));
    expect(getByText('Forgot Password')).toBeDefined();
    await fireEvent.press(queryByTestId('header-back'));
    expect(getByText('Sign in to your account')).toBeDefined();
  });
});
