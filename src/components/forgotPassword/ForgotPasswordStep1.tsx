import { Auth } from 'aws-amplify';
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import AppButton from '../../components/common/AppButton';
import AppTextInput from '../../components/common/AppTextInput';
import { PossibleActionType, useAsync } from '../../helpers/customHooks';

type Props = {
  setIsConfirmStep: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: (value: string) => void;
  email: string;
  checkErrors: (value: string) => void;
  errorsMessages: Record<string, string>;
};

type UserType = {
  email: string;
};

const ForgotPasswordStep1 = ({
  setIsConfirmStep,
  setEmail,
  email,
  checkErrors,
  errorsMessages,
}: Props) => {
  const { run, status } = useAsync<UserType>();
  const forgotPassword = () => {
    run(Auth.forgotPassword(email)).then(() => {
      setIsConfirmStep(true);
    });
  };
  return (
    <>
      <View>
        <AppTextInput
          value={email || ''}
          onChangeText={value => setEmail(value)}
          leftIcon="person-outline"
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          onBlur={() => checkErrors('email')}
          errorMessage={errorsMessages.email || ''}
        />
      </View>
      {status === PossibleActionType.ERROR ? (
        <Text>Something wrong happened. Please try again!</Text>
      ) : (
        ''
      )}
      <View style={styles.footerButtonContainer}>
        <AppButton
          loading={status === PossibleActionType.LOADING}
          title="Validate"
          onPress={forgotPassword}
          disabled={status === PossibleActionType.LOADING}
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
});

export default ForgotPasswordStep1;
