import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';

type Props = {
  children: React.ReactNode;
};

const AppContainer = ({ children }: Props) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container]}
    >
      <TouchableWithoutFeedback
        onPress={Platform.OS !== 'web' ? Keyboard.dismiss : undefined}
      >
        {children}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
});

export default AppContainer;
