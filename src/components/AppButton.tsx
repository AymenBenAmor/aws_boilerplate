import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from '@ui-kitten/components';
import { GestureResponderEvent } from 'react-native';

type Props = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
};

const AppButton: React.FC<Props> = ({ title, onPress }: Props) => {
  return (
    <Button style={styles.button} onPress={onPress}>
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
    padding: 15,
    width: '80%',
    backgroundColor: 'tomato',
  },
});

export default AppButton;
