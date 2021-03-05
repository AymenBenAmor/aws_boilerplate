/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StackNavigationProp } from '@react-navigation/stack';
import { Auth } from 'aws-amplify';
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import AppButton from '../../components/common/AppButton';
import AppTextInput from '../../components/common/AppTextInput';
import useForm from '../../components/common/custemHook/useForm';
import { authFun } from '../../helpers/functions';

type Props = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsConfirmStep: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};

const SignUpStep1: React.FC<Props> = ({
  loading,
  setLoading,
  setIsConfirmStep,
  setEmail,
}) => {
  const {
    handleChange,
    checkErrors,
    values,
    isSubmitting,
    errorsMessages,
  } = useForm(
    {
      email: 'jiancehenj@shadesstreet.com',
      password: '1111111111',
      confirmPassword: '1111111111',
    },
    {
      email: 'Invalid email',
      password: 'Invalid password',
      confirmPassword: 'Password mismatch',
    }
  );

  async function signUp() {
    setLoading(true);
    console.log('loading', loading);
    authFun({
      func: Auth.signUp({
        username: values.email,
        password: values.password,
        attributes: {
          email: values.email,
        },
      }),
      onSuccessFn: (res) => {
        setIsConfirmStep(true);
        console.log('res', res);
        setEmail(values.email);
      },
      onFailedFn: (err) => {
        console.log('err', err);
      },
      callback: () => setLoading(false),
    });
  }

  return (
    <View style={[styles.subcontainer]}>
      <Text style={styles.title}>Sign Up</Text>

      <View>
        <AppTextInput
          value={values.email || ''}
          onChangeText={(value) => handleChange({ name: 'email', value })}
          leftIcon="person-outline"
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          onBlur={() => checkErrors('email')}
          errorMessage={errorsMessages.email || ''}
        />
        <AppTextInput
          value={values.password || ''}
          onChangeText={(value) => handleChange({ name: 'password', value })}
          leftIcon="lock-outline"
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          textContentType="password"
          onBlur={() => checkErrors('password')}
          errorMessage={errorsMessages.password || ''}
        />
        <AppTextInput
          value={values.confirmPassword || ''}
          onChangeText={(value) =>
            handleChange({ name: 'confirmPassword', value })
          }
          leftIcon="lock-outline"
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          textContentType="password"
          onBlur={() => checkErrors('confirmPassword')}
          errorMessage={errorsMessages.confirmPassword || ''}
        />
      </View>

      <AppButton
        loading={loading}
        title="confirmSignUp"
        onPress={() => signUp()}
        disabled={isSubmitting}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  subcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    color: '#202020',
    fontWeight: '500',
    marginVertical: 15,
  },
});

export default SignUpStep1;
