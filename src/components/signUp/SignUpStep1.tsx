import { Auth } from 'aws-amplify';
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import AppButton from '../../components/common/AppButton';
import AppTextInput from '../../components/common/AppTextInput';
import useForm from '../../components/common/custemHook/useForm';
import { PossibleActionType, useAsync } from '../../helpers/customHooks';

type Props = {
  setIsConfirmStep: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

const SignUpStep1: React.FC<Props> = ({
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
      email: 'ansiosid@macnausa.com',
      family_name: 'firstName',
      given_name: 'lastname',
      address: 'address',
      password: '1111111111',
      confirmPassword: '1111111111',
    },
    {
      email: 'Invalid email',
      family_name: 'Invalid firstName',
      given_name: 'Invalid lastname',
      address: 'Invalid address',
      password: 'Invalid password',
      confirmPassword: 'Password mismatch',
    },
  );

  const { status, run } = useAsync<any>();

  const signUpStep1 = () => {
    run(
      Auth.signUp({
        username: values.email,
        password: values.password,
        attributes: {
          given_name: values.given_name,
          family_name: values.family_name,
          address: values.address,
        },
      }),
    ).then(
      () => {
        setIsConfirmStep(true);
        setEmail(values.email);
      },
      error => {
        setMessage(error.message);
      },
    );
  };

  return (
    <ScrollView contentContainerStyle={[styles.subcontainer]}>
      <Text style={styles.title}>Sign Up</Text>

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
        <AppTextInput
          value={values.family_name || ''}
          onChangeText={value => handleChange({ name: 'family_name', value })}
          leftIcon="person-outline"
          placeholder="Enter first name"
          autoCapitalize="none"
          onBlur={() => checkErrors('family_name')}
          errorMessage={errorsMessages.family_name || ''}
        />
        <AppTextInput
          value={values.given_name || ''}
          onChangeText={value => handleChange({ name: 'given_name', value })}
          leftIcon="person-outline"
          placeholder="Enter last name"
          autoCapitalize="none"
          onBlur={() => checkErrors('given_name')}
          errorMessage={errorsMessages.given_name || ''}
        />
        <AppTextInput
          value={values.address || ''}
          onChangeText={value => handleChange({ name: 'address', value })}
          leftIcon="person-outline"
          placeholder="Enter address"
          autoCapitalize="none"
          onBlur={() => checkErrors('address')}
          errorMessage={errorsMessages.address || ''}
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
        loading={status === PossibleActionType.LOADING}
        title="confirmSignUp"
        onPress={signUpStep1}
        disabled={isSubmitting}
      />
    </ScrollView>
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
