import React from 'react';
import { render } from '../../../../utils/test-utils';

import AppButton from '../AppButton';

describe('<AppButton />', () => {
  it('should display a button with the right text', () => {
    const title = 'this is a button';
    const handlePress = jest.fn();
    const { getByText } = render(
      <AppButton title={title} onPress={handlePress} />,
    );
    expect(getByText(title)).toBeDefined();
  });
});
