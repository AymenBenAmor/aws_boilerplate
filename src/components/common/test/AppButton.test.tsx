import React from 'react';

import { cleanup, fireEvent } from '@testing-library/react-native';

import { render } from '../../../../utils/test-utils';

import AppButton from '../AppButton';

describe('<AppButton />', () => {
  const title = 'this is a button';
  const handlePress = jest.fn();
  afterEach(cleanup);

  it('should display a button with the right text', () => {
    const { getByText } = render(
      <AppButton label={title} onPress={handlePress} />,
    );
    expect(getByText(title)).toBeDefined();
  });

  it('should not display  the text when loading is true', () => {
    const { queryByText } = render(
      <AppButton label={title} onPress={handlePress} loading />,
    );
    expect(queryByText(title)).toBeNull();
  });

  it(' button  execute  function ', () => {
    const { getByText } = render(
      <AppButton label={title} onPress={handlePress} />,
    );
    fireEvent.press(getByText(title));
    expect(handlePress).toBeCalled();
  });
});

// I want use Cleanup for i can make all the tests in same describe but it doesn't work

describe('<AppButton />', () => {
  const title = 'this is a button';
  const handlePress = jest.fn();
  it(' button does not execute the function when it is disabled', () => {
    const { getByText } = render(
      <AppButton label={title} onPress={handlePress} disabled />,
    );
    fireEvent.press(getByText(title));
    expect(handlePress).not.toBeCalled();
  });
});
