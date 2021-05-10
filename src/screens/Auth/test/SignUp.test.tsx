import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';

import { render } from '../../../../utils/test-utils';
import SignUp from '../SignUp';

describe('<SignUp />', () => {
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

    await fireEvent.changeText(queryByTestId('SignUp.email'), 'gmail');
    fireEvent(getByTestId('SignUp.email'), 'blur');
    expect(getByText('Invalid email')).toBeDefined();
  });
  it('shows invalid user name error message', async () => {
    const { getByText } = render(<SignUp navigation={navigation} />);

    await fireEvent.press(getByText('confirmSignUp'));
  });
});
