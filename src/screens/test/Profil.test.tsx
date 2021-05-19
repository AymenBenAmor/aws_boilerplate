import * as React from 'react';
import { fireEvent, act } from '@testing-library/react-native';

import { Auth, currentAuthenticatedUser } from '../__mocks__/aws-amplify';

import Profile from '../Profile';
import { render } from '../../../utils/test-utils';

jest.useFakeTimers();

describe('<Profil />', () => {
  const component = <Profile />;
  it('renders default elements', async () => {
    const { getByText } = render(component);
    act(() => {
      jest.runAllTimers();
    });
    expect(getByText('My profile')).toBeDefined();
    expect(getByText('updateUserDetails')).toBeDefined();
    expect(getByText(/email:/i)).toBeDefined();
    expect(getByText(/first name:/i)).toBeDefined();
    expect(getByText(/last name:/i)).toBeDefined();
    expect(getByText(/address:/i)).toBeDefined();

    await act(() => Auth.currentAuthenticatedUser());
  });
  it('renders elements after fetching fake data from data base', async () => {
    const { getByText } = render(component);
    act(() => {
      jest.runAllTimers();
    });

    await act(() => Auth.currentAuthenticatedUser());
    expect(getByText(`Email:${currentAuthenticatedUser.email}`)).toBeDefined();
    expect(
      getByText(`first name:${currentAuthenticatedUser.family_name}`),
    ).toBeDefined();
    expect(
      getByText(`last name:${currentAuthenticatedUser.given_name}`),
    ).toBeDefined();
    expect(
      getByText(`address:${currentAuthenticatedUser.address}`),
    ).toBeDefined();
  });

  it('renders inputs after Click in the button ', async () => {
    const { getByText, getByTestId, getByPlaceholderText } = render(component);
    act(() => {
      jest.runAllTimers();
    });

    await act(() => Auth.currentAuthenticatedUser());

    fireEvent.press(getByTestId('submit.button'));
    // await waitForElementToBeRemoved(() => getByTestId('submit.button'));
    expect(getByText('Update')).toBeDefined();

    expect(getByPlaceholderText(`Enter email`).props.value).toBeDefined();
    expect(getByPlaceholderText(`Enter first name`).props.value).toBeDefined();
    expect(getByPlaceholderText(`Enter last name`).props.value).toBeDefined();
    expect(getByPlaceholderText(`Enter address`).props.value).toBeDefined();
  });

  it('renders inputs with values ', async () => {
    const { getByText, getByTestId, getByPlaceholderText } = render(component);
    act(() => {
      jest.runAllTimers();
    });

    await act(() => Auth.currentAuthenticatedUser());

    fireEvent.press(getByTestId('submit.button'));
    // await waitForElementToBeRemoved(() => getByTestId('submit.button'));
    expect(getByText('Update')).toBeDefined();

    expect(getByPlaceholderText(`Enter email`).props.value).toBe(
      `${currentAuthenticatedUser.email}`,
    );
    expect(getByPlaceholderText(`Enter first name`).props.value).toBe(
      `${currentAuthenticatedUser.family_name}`,
    );
    expect(getByPlaceholderText(`Enter last name`).props.value).toBe(
      `${currentAuthenticatedUser.given_name}`,
    );
    expect(getByPlaceholderText(`Enter address`).props.value).toBe(
      `${currentAuthenticatedUser.address}`,
    );
  });
});
