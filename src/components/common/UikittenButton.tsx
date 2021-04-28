import { Button, ButtonProps } from '@ui-kitten/components';
import React from 'react';

const UikittenButton = (props: ButtonProps) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Button {...props} />;
};

export default UikittenButton;
