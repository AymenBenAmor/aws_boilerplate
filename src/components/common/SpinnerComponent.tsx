import * as React from 'react';
import { Spinner } from '@ui-kitten/components';
import { EvaSize, EvaStatus } from '@ui-kitten/components/devsupport';
import { StyleSheet, View, ViewStyle } from 'react-native';

type Props = {
  color?: EvaStatus;
  styleContainer?: ViewStyle;
  style?: ViewStyle;
  size: EvaSize;
};

const SpinnerComponent = ({
  color = 'basic',
  styleContainer,
  style = {},
  size,
}: Props) => {
  return (
    <View style={[styleContainer ? styles.container : styleContainer, style]}>
      <Spinner status={color} size={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SpinnerComponent;
