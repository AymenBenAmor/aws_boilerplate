import { Button } from '@ui-kitten/components';
import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StyleSheet, ViewStyle, GestureResponderEvent } from 'react-native';

import Spinner from './SpinnerComponent';

type Props = {
  title: string;
  loading?: boolean;
  disabled: boolean;
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
};

const AppButton: React.FC<Props> = ({
  title,
  onPress = () => {},
  loading = false,
  disabled = false,
  style,
}: Props) => {
  const loadingIndicator = () => (loading ? <Spinner size="small" /> : <></>);

  const handleClick = (e: GestureResponderEvent) => {
    console.log('handelClick', loading);

    !loading && onPress(e);
  };

  return (
    <Button
      style={[styles.button, style]}
      onPress={handleClick}
      accessoryLeft={() => loadingIndicator()}
      disabled={disabled}
    >
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'tomato',
    width: '100%',
  },
});

export default AppButton;
