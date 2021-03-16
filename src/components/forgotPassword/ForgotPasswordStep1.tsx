/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StackNavigationProp } from '@react-navigation/stack';
import { Auth } from 'aws-amplify';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import AppButton from '../../components/common/AppButton';
import AppTextInput from '../../components/common/AppTextInput';
import { authFun } from '../../helpers/functions';
import { useAsync } from '../common/custemHook/useAsync';
import useForm from '../common/custemHook/useForm';

type Props = {
  setIsConfirmStep: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

const ForgotPasswordStep1: React.FC<Props> = ({
  setIsConfirmStep,
  setEmail,
  setMessage,
}) => {
  const {
    handleChange,
    checkErrors,
    values,
    isSubmitting,
    errorsMessages,
  } = useForm(
    {
      email: 'jiancehenj@anikamenon.com',
    },
    {
      email: 'Invalid email',
    }
  );

  const { message, loading, loadData: forgotPassword } = useAsync({
    fetchFn: () => Auth.forgotPassword(values.email),
    onSuccessFn: (res) => {
      setIsConfirmStep(true);
      setEmail(values.email);

      console.log('res', res);
    },
    onFailedFn: () => {},
    callback: () => {},
  });
  React.useEffect(() => {
    setMessage(message);
  }, [message]);
  // async function forgotPassword() {
  //   setLoading(true);
  //   authFun({
  //     func: Auth.forgotPassword(values.email),
  //     onSuccessFn: (res) => {
  //       setIsConfirmStep(true);
  //       setEmail(values.email);

  //       console.log('res', res);
  //     },
  //     onFailedFn: (err) => {
  //       console.log('err', err);
  //       setMessage(err.message);
  //     },
  //     callback: () => setLoading(false),
  //   });
  // }

  return (
    <>
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
      </View>

      <View style={styles.footerButtonContainer}>
        <AppButton
          loading={loading}
          title="Validate"
          onPress={forgotPassword}
          disabled={isSubmitting}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
  forgotPasswordButtonText: {
    color: 'tomato',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ForgotPasswordStep1;
