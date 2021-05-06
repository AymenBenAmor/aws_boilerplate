import React from 'react';

import { fireEvent } from '@testing-library/react-native';

import { render } from '../../../../utils/test-utils';

import AppTextInput from '../AppTextInput';

describe('<AppTextInput />', () => {
  const value = 'text input';
  const errorMessage = 'error text';
  const placeholder = 'Input Text';

  const onChange = jest.fn();

  it('should display a AppTextInput with the right text', () => {
    const { queryByText } = render(<AppTextInput value={value} />);

    expect(queryByText(value)).toBeDefined();
  });

  it('test changeText event', () => {
    const { getByPlaceholderText } = render(
      <AppTextInput onChangeText={onChange} placeholder={placeholder} />,
    );

    fireEvent(getByPlaceholderText(placeholder), 'onChangeText', value);

    expect(onChange).toHaveBeenCalledWith(value);
  });

  it('should not display  the text error', () => {
    const { queryByText } = render(
      <AppTextInput value={value} errorMessage={errorMessage} />,
    );
    expect(queryByText(errorMessage).props.children).toBe(errorMessage);
  });
});
