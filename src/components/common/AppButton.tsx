import { ButtonProps } from '@ui-kitten/components';
import React from 'react';
import {
  StyleSheet,
  ViewStyle,
  GestureResponderEvent,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewProps,
} from 'react-native';

type Props = {
  label?: string;
  loading?: boolean;
  disabled?: boolean;
  accessoryLeft?: ViewProps;
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
} & ButtonProps;

const AppButton = ({
  label,
  onPress,
  loading = false,
  disabled = false,
  style,
  accessoryLeft,
  ...buttonProps
}: Props) => {
  const handleClick = (e: GestureResponderEvent) => {
    if (!loading) {
      onPress(e);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={style || styles.button}
      onPress={handleClick}
      disabled={disabled}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...buttonProps}
    >
      {accessoryLeft && accessoryLeft()}

      {loading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </TouchableOpacity>
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
    paddingVertical: 15,
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AppButton;
