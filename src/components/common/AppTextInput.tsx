/* eslint-disable @typescript-eslint/no-unused-vars */
import { Input, Layout, Icon } from '@ui-kitten/components';
import React from 'react';
import {
  StyleSheet,
  TextInputProps,
  TouchableWithoutFeedback,
} from 'react-native';

type Props = {
  leftIcon?: string;
  isPasswordInput?: boolean;
} & TextInputProps;

const AppTextInput: React.FC<Props> = ({ leftIcon, ...otherProps }) => {
  const isPasswordInput = otherProps.textContentType === 'password';

  const [secureTextEntry, setSecureTextEntry] = React.useState(isPasswordInput);

  const _renderasswordIcon = () => (
    <TouchableWithoutFeedback
      onPress={() => setSecureTextEntry(!secureTextEntry)}
    >
      <Icon
        style={styles.passwordIcon}
        name={secureTextEntry ? 'eye-off' : 'eye'}
        fill="#6e6869"
      />
    </TouchableWithoutFeedback>
  );

  return (
    <Layout style={styles.container}>
      <Input
        style={styles.input}
        placeholderTextColor="#6e6869"
        {...otherProps}
        accessoryLeft={() =>
          leftIcon ? (
            <Icon name={leftIcon} fill="#6e6869" style={styles.icon} />
          ) : (
            <></>
          )
        }
        accessoryRight={() =>
          otherProps.textContentType === 'password' ? (
            _renderasswordIcon()
          ) : (
            <></>
          )
        }
        secureTextEntry={secureTextEntry}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    flexDirection: 'row',
    marginVertical: 10,
    height: 40,
    width: '100%',
  },
  icon: {
    marginRight: 10,
    width: 32,
    height: 32,
  },
  passwordIcon: {
    width: 25,
    height: 25,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#101010',
  },
});

export default AppTextInput;
