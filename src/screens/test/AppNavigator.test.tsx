import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  fireEvent,
  act,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';

import { render } from '../../../utils/test-utils';
import AppNavigator from '../../navigation/AppNavigator';
import { Auth } from '../__mocks__/aws-amplify';

jest.useFakeTimers();

describe('<AppNavigator.test />', () => {
  const updateAuth = jest.fn();

  const component = (
    <NavigationContainer>
      <AppNavigator updateAuthState={updateAuth} />
    </NavigationContainer>
  );

  it('should contains home text', async () => {
    const { getByText } = render(component);
    expect(getByText('React Native + Amplify')).toBeDefined();
  });
  it('should go To Profile page when clicking on profile button', async () => {
    const { getByText, getByTestId } = render(component);
    fireEvent.press(getByTestId('Profile'));
    waitForElementToBeRemoved(() => getByTestId('Profile'));
    await act(() => Auth.currentAuthenticatedUser());
    expect(getByText('My profile')).toBeDefined();
  });
  it('should go To Profile page when clicking on profile button', async () => {
    const { getByText, getByTestId } = render(component);
    fireEvent.press(getByTestId('Profile'));
    waitForElementToBeRemoved(() => getByTestId('Profile'));
    await act(() => Auth.currentAuthenticatedUser());
    expect(getByText('My profile')).toBeDefined();
  });
  it('should go to Profile page when clicking on profile button and go back after click in header-back button', async () => {
    const { getByText, getByTestId, queryByTestId } = render(component);
    fireEvent.press(getByTestId('Profile'));
    waitForElementToBeRemoved(() => getByTestId('Profile'));
    await act(() => Auth.currentAuthenticatedUser());
    expect(getByText('My profile')).toBeDefined();
    await fireEvent.press(queryByTestId('header-back'));
    expect(getByText('React Native + Amplify')).toBeDefined();
  });
  it('should go to chat page when clicking on profile button and go back after click in header-back button', async () => {
    const { getByTestId } = render(component);
    fireEvent.press(getByTestId('Chat'));
    waitForElementToBeRemoved(() => getByTestId('Chat'));
    await act(() => Auth.currentAuthenticatedUser());
    expect(getByTestId('chat.button')).toBeDefined();
  });
});
