import { StackNavigationProp } from '@react-navigation/stack';
import { Auth } from 'aws-amplify';
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import AppButton from 'components/common/AppButton';
import AppTextInput from 'components/common/AppTextInput';
import useForm from 'components/common/custemHook/useForm';
import { ParamList } from '../../navigation/ParamList';
import { PossibleActionType, useAsync } from '../../helpers/customHooks';
import { ToastContext } from '../../context/Toast/ToastContext';

type Props = {
  navigation: StackNavigationProp<ParamList, 'SignUp'>;
  email: string;
};

const SignUpStep = ({ navigation, email }: Props) => {
  const {
    handleChange,
    checkErrors,
    values,
    isSubmitting,
    errorsMessages,
  } = useForm({
    verificationCode: {
      defaultValue: '',
      errorsCondition: {
        required: true,
      },
      errorMessage: 'Invalid code',
    },
  });
  const { show } = React.useContext(ToastContext);

  const { status, run } = useAsync();

  const signUpStep2 = () => {
    run(Auth.confirmSignUp(email, values.verificationCode)).then(
      () => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'SignIn' }],
        });
      },
      ({ message }: { message: string }) => {
        if (show) {
          show({ message });
        }
      },
    );
  };
  const resendConfirmationCode = () => {
    run(Auth.resendSignUp(email)).then();
  };

  return (
    <View style={[styles.subcontainer]}>
      <Text style={styles.title}>verification Sign Up</Text>

      <AppTextInput
        value={values.verificationCode}
        onChangeText={value => {
          return handleChange({ name: 'verificationCode', value });
        }}
        leftIcon="lock-outline"
        placeholder="Enter verification code "
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        onBlur={() => checkErrors('verificationCode')}
        errorMessage={errorsMessages.verificationCode || ''}
        testID="SignUp.verificationCode"
      />

      <View style={styles.footerButtonContainer}>
        <AppButton
          label="confirmSignUp2"
          onPress={() => signUpStep2()}
          disabled={isSubmitting}
        />
        <AppButton
          loading={status === PossibleActionType.LOADING}
          label="Resend Code"
          onPress={resendConfirmationCode}
        />
      </View>
    </View>
  );
};

export default SignUpStep;
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
