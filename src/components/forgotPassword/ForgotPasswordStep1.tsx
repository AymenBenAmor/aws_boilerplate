import { Auth } from 'aws-amplify';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import AppButton from '../../components/common/AppButton';
import AppTextInput from '../../components/common/AppTextInput';
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
}: Props) => {
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
    },
  );

  const { message, loading, loadData: forgotPassword } = useAsync({
    fetchFn: () => Auth.forgotPassword(values.email),
    onSuccessFn: () => {
      setIsConfirmStep(true);
      setEmail(values.email);
    },
  });
  React.useEffect(() => {
    setMessage(message);
  }, [message, setMessage]);

  return (
    <>
      <View>
        <AppTextInput
          value={values.email || ''}
          onChangeText={value => handleChange({ name: 'email', value })}
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
