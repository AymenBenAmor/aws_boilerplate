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
import { ParamList } from '../../navigation/ParamList';

type Props = {
  navigation: StackNavigationProp<ParamList, 'SignUp'>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
};

const SignUpStep: React.FC<Props> = ({
  navigation,
  loading,
  setLoading,
  email,
}) => {
  console.log(email);

  const {
    handleChange,
    checkErrors,
    values,
    isSubmitting,
    errorsMessages,
  } = useForm(
    {
      verificationCode: '958338',
    },
    {
      verificationCode: 'Invalid verification code',
    }
  );

  console.log('isSubmitting');

  async function confirmSignUp() {
    setLoading(true);
    console.log('loading', loading);

    authFun({
      func: Auth.confirmSignUp(email, values.verificationCode),
      onSuccessFn: (res) => {
        console.log('res', res);

        navigation.reset({
          index: 0,
          routes: [{ name: 'SignIn' }],
        });
      },
      onFailedFn: (err) => {
        console.log('err', err);
      },
      callback: () => setLoading(false),
    });
  }

  async function resendConfirmationCode() {
    authFun({
      func: Auth.resendSignUp(email),
      onSuccessFn: (res) => {
        console.log('okiii', res);
      },
      onFailedFn: (err) => {
        console.log('err', err);
      },
      callback: () => setLoading(false),
    });
  }

  return (
    <View style={[styles.subcontainer]}>
      <Text style={styles.title}>verification Sign Up</Text>

      <AppTextInput
        value={values.verificationCode}
        onChangeText={(value) =>
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

      <View style={styles.footerButtonContainer}>
        <AppButton
          loading={loading}
          title="confirmSignUp"
          onPress={() => confirmSignUp()}
          disabled={isSubmitting}
        />
        <AppButton
          loading={loading}
          title="Resend Code"
          onPress={resendConfirmationCode}
        />
      </View>
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
  footerButtonContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default SignUpStep;
