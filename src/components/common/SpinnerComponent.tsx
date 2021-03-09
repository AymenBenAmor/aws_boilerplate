/* eslint-disable @typescript-eslint/no-unused-vars */
import { Spinner } from '@ui-kitten/components';
import { EvaSize, EvaStatus } from '@ui-kitten/components/devsupport';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  color?: EvaStatus;
  styleContainer?: any;
  style?: any;
  size: EvaSize;
};

const SpinnerComponent: React.FC<Props> = ({
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
