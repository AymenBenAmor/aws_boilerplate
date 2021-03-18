import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';

type Props = {
  children: any;
  style?: Record<string, unknown>;
};

const AppContainer: React.FC<Props> = ({ children, style }: Props) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, style]}
      keyboardVerticalOffset={130}
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
    height: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
});

export default AppContainer;
