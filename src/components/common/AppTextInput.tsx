/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  StyleSheet,
  TextInputProps,
  TouchableWithoutFeedback,
  Text,
  View,
  TextInput,
} from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';

type Props = {
  leftIcon?: string;
  isPasswordInput?: boolean;
  errorMessage?: string;
} & TextInputProps;

const AppTextInput = ({ errorMessage, ...otherProps }: Props) => {
  const isPasswordInput = otherProps.textContentType === 'password';
  const [secureTextEntry, setSecureTextEntry] = React.useState(isPasswordInput);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputView,
          { borderColor: errorMessage ? 'red' : '#8a8a8a' },
          otherProps.textContentType === 'password' && {
            paddingHorizontal: 15,
          },
        ]}
      >
        <TextInput
          style={[styles.input]}
          placeholderTextColor="#6e6869"
          {...otherProps}
          secureTextEntry={secureTextEntry}
        />
        {otherProps.textContentType === 'password' ? (
          <TouchableWithoutFeedback
            onPress={() => setSecureTextEntry(!secureTextEntry)}
          >
            {secureTextEntry ? (
              <AntDesign name="eye" size={24} color="black" />
            ) : (
              <Entypo name="eye-with-line" size={23} color="black" />
            )}
          </TouchableWithoutFeedback>
        ) : (
          <></>
        )}
      </View>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    height: 40,
    width: '100%',
    marginBottom: 25,
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
  inputView: {
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  input: {
    fontSize: 18,
    color: '#101010',
    width: '100%',
  },
  errorMessage: {
    color: 'red',
    fontSize: 13,
  },
});

export default AppTextInput;
