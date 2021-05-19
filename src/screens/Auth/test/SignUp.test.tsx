import * as React from 'react';
import {
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';

import { render } from '../../../../utils/test-utils';
import SignUp from '../SignUp';

describe('<SignUp />', () => {
  /* eslint-disable @typescript-eslint/no-explicit-any  */
  const navigation: any = jest.fn();

  it('page contains sign up text', async () => {
    const { getByText } = render(<SignUp navigation={navigation} />);
    expect(getByText('Sign Up')).toBeDefined();
  });

  it('renders default elements', async () => {
    const { getByPlaceholderText } = render(<SignUp navigation={navigation} />);

    getByPlaceholderText('Enter email');
    getByPlaceholderText('Enter first name');
  });

  it('shows invalid user name error message', async () => {
    const { getByText, queryByTestId, getByTestId } = render(
      <SignUp navigation={navigation} />,
    );

    fireEvent.changeText(queryByTestId('SignUp.email'), 'gmail');
    fireEvent(getByTestId('SignUp.email'), 'blur');
    expect(getByText('Invalid email')).toBeDefined();
  });
  it('go to the next page sign Up', async () => {
    const { getByText, getByTestId } = render(
      <SignUp navigation={navigation} />,
    );

    fireEvent.press(getByTestId('submit.button'));
    await waitForElementToBeRemoved(() => getByTestId('submit.button'));
    expect(getByText('confirmSignUp2')).toBeDefined();
  });
  it('test resend verification code', async () => {
    const { getByText, getByTestId } = render(
      <SignUp navigation={navigation} />,
    );

    fireEvent.press(getByTestId('submit.button'));
    await waitForElementToBeRemoved(() => getByTestId('submit.button'));
    expect(getByText('Resend Code')).toBeDefined();
  });

  it('shows invalid verification code error message', async () => {
    const { getByText, getByTestId, queryByTestId } = render(
      <SignUp navigation={navigation} />,
    );

    fireEvent.press(getByTestId('submit.button'));
    await waitForElementToBeRemoved(() => getByTestId('submit.button'));
    expect(getByText('Resend Code')).toBeDefined();
    expect(queryByTestId('SignUp.verificationCode')).toBeDefined();
    fireEvent(getByTestId('SignUp.verificationCode'), 'blur');
    expect(getByText('Invalid code')).toBeDefined();
  });
});
