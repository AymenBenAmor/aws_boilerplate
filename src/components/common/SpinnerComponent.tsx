import { Spinner } from '@ui-kitten/components';
import { EvaSize, EvaStatus } from '@ui-kitten/components/devsupport';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  color?: EvaStatus;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  styleContainer?: any; // todo => fix this type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: any; // todo => fix this type
  size: EvaSize;
};

const SpinnerComponent = ({
  color = 'basic',
  styleContainer = null,
  style,
  size,
}: Props) => {
  return (
    <View
      style={[
        styleContainer === null ? styles.container : styleContainer,
        style,
      ]}
    >
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
