import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { fireEvent } from '@testing-library/react-native';

import { render } from '../../../../utils/test-utils';
import AuthenticationNavigator from '../../../navigation/AuthenticationNavigator';
import SignIn from '../SignIn';

jest.useFakeTimers();

describe('<SignIn />', () => {
  it('page contains sign in text', async () => {
    const updateAuth = jest.fn();
    const navigation: any = jest.fn();
    const { getByText } = render(
      <SignIn updateAuthState={updateAuth} navigation={navigation} />,
    );
    expect(getByText('Sign in to your account')).toBeDefined();
  });

  it('should go To signup when clicking on signup button', async () => {
    const updateAuth = jest.fn();
    const component = (
      <NavigationContainer>
        <AuthenticationNavigator updateAuthState={updateAuth} />
      </NavigationContainer>
    );

    const { getByText } = render(component);
    expect(getByText('Sign in to your account')).toBeDefined();
    fireEvent.press(getByText("Don't have an account? Sign Up"));
    expect(getByText('Sign Up')).toBeDefined();
  });
});
