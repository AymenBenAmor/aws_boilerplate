import { StackNavigationProp } from '@react-navigation/stack';
import { Auth } from 'aws-amplify';
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import AppButton from '../../components/common/AppButton';
import AppTextInput from '../../components/common/AppTextInput';
import useForm from '../../components/common/custemHook/useForm';
import { ParamList } from '../../navigation/ParamList';
import { useAsync } from '../common/custemHook/useAsync';

type Props = {
  navigation: StackNavigationProp<ParamList, 'SignUp'>;
  email: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

const SignUpStep = ({
  navigation,

  email,
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
      verificationCode: '958338',
    },
    {
      verificationCode: 'Invalid verification code',
    },
  );

  const { loading, loadData: confirmSignUp } = useAsync({
    fetchFn: () => Auth.confirmSignUp(email, values.verificationCode),
    onSuccessFn: () => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'SignIn' }],
      });
    },
    onFailedFn: err => {
      setMessage(err.message);
    },
  });

  const {
    loading: resendCodeLoading,
    loadData: resendConfirmationCode,
  } = useAsync({
    fetchFn: () => Auth.resendSignUp(email),
  });

  return (
    <View style={[styles.subcontainer]}>
      <Text style={styles.title}>verification Sign Up</Text>

      <AppTextInput
        value={values.verificationCode}
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

      <View style={styles.footerButtonContainer}>
        <AppButton
          loading={loading}
          title="confirmSignUp"
          onPress={() => confirmSignUp()}
          disabled={isSubmitting}
        />
        <AppButton
          loading={resendCodeLoading}
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
