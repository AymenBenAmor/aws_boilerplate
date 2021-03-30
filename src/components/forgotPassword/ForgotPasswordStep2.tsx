import { StackNavigationProp } from '@react-navigation/stack';
import { Auth } from 'aws-amplify';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppButton from '../../components/common/AppButton';
import AppTextInput from '../../components/common/AppTextInput';
import { ParamList } from '../../navigation/ParamList';
import { PossibleActionType, useAsync } from '../../helpers/customHooks';

type Props = {
  navigation: StackNavigationProp<ParamList, 'SignUp'>;
  values: Record<string, string>;
  checkErrors: (value: string) => void;
  handleChange: ({ name, value }: { name: string; value: string }) => void;
  errorsMessages: Record<string, string>;
};

const ForgotPasswordStep2 = ({
  navigation,
  values,
  checkErrors,
  handleChange,
  errorsMessages,
}: Props) => {
  const { status, run } = useAsync();
  const confirmForgotPassword = async () => {
    await run(
      Auth.forgotPasswordSubmit(
        values.email,
        values.verificationCode,
        values.password,
      ),
    ).then(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'SignIn' }],
      });
    });
  };
  return (
    <>
      <View>
        <AppTextInput
          value={values.verificationCode || ''}
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
          onChangeText={value => {
            return handleChange({ name: 'confirmPassword', value });
          }}
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
      {status === PossibleActionType.ERROR ? (
        <Text>Something wrong happened. Please try again!</Text>
      ) : (
        ''
      )}
      <View style={styles.footerButtonContainer}>
        <AppButton
          loading={status === PossibleActionType.LOADING}
          title="Validate"
          onPress={confirmForgotPassword}
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
  forgotPasswordButtonText: {
    color: 'tomato',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ForgotPasswordStep2;
