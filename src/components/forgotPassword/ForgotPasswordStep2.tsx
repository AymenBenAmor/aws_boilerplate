import { StackNavigationProp } from '@react-navigation/stack';
import { Auth } from 'aws-amplify';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import AppButton from '../../components/common/AppButton';
import AppTextInput from '../../components/common/AppTextInput';
import { authFun } from '../../helpers/functions';
import { ParamList } from '../../navigation/ParamList';
import useForm from '../common/custemHook/useForm';

type Props = {
  navigation: StackNavigationProp<ParamList, 'SignUp'>;
  email: string;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

const ForgotPasswordStep2 = ({
  navigation,
  email,
  loading,
  setLoading,
  setMessage,
}: Props) => {
  const {
    handleChange,
    checkErrors,
    values,
    isSubmitting,
    errorsMessages,
  } = useForm(
    {
      verificationCode: '818302',
      password: '1111111112',
      confirmPassword: '1111111112',
    },
    {
      verificationCode: 'Invalid verification code',
      password: 'Invalid password',
      confirmPassword: 'Password mismatch',
    },
  );

  async function confirmForgotPassword() {
    setLoading(true);
    authFun({
      func: Auth.forgotPasswordSubmit(
        email,
        values.verificationCode,
        values.password,
      ),
      onSuccessFn: () => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'SignIn' }],
        });
      },
      onFailedFn: err => {
        setMessage(err.message);
      },
      callback: () => setLoading(false),
    });
  }

  return (
    <>
      <View>
        <AppTextInput
          value={values.verificationCode || ''}
          onChangeText={value =>
            handleChange({ name: 'verificationCode', value })
          }
          leftIcon="lock-outline"
          placeholder="Enter verification code "
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          onBlur={() => checkErrors('verificationCode')}
          errorMessage={errorsMessages.verificationCode || ''}
        />
        <AppTextInput
          value={values.password || ''}
          onChangeText={value => handleChange({ name: 'password', value })}
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
          onChangeText={value =>
            handleChange({ name: 'confirmPassword', value })
          }
          leftIcon="lock-outline"
          placeholder="Enter confirm password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          textContentType="password"
          onBlur={() => checkErrors('confirmPassword')}
          errorMessage={errorsMessages.confirmPassword || ''}
        />
      </View>
      <View style={styles.footerButtonContainer}>
        <AppButton
          loading={loading}
          title="Validate"
          onPress={confirmForgotPassword}
          disabled={isSubmitting}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  footerButtonContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  forgotPasswordButtonText: {
    color: 'tomato',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ForgotPasswordStep2;