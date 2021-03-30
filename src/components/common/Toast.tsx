import { Modal } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

type Props = {
  message: string;
  type?: string;
  callback: React.Dispatch<React.SetStateAction<string>>;
};

const Toast = ({ message, type = 'error', callback }: Props) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (message) {
        callback('');
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [callback, message]);

  return (
    <Modal visible={!!message} style={{ width: '100%' }}>
      <View
        style={[
          styles.modal,
          { backgroundColor: type === 'error' ? '#f94b4b' : '#00965e' },
        ]}
      >
        <Text style={styles.message}>{message}</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 7,
    alignItems: 'center',
  },
  message: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Toast;
