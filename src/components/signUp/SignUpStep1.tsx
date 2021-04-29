import { Auth } from 'aws-amplify';
import * as React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

import AppButton from 'components/common/AppButton';
import AppTextInput from 'components/common/AppTextInput';
import useForm from 'components/common/custemHook/useForm';
import { PossibleActionType, useAsync } from '../../helpers/customHooks';
import { ToastContext } from '../../context/Toast/ToastContext';

type Props = {
  setIsConfirmStep: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};

const SignUpStep1: React.FC<Props> = ({
  setIsConfirmStep,
  setEmail,
}: Props) => {
  const {
    handleChange,
    checkErrors,
    values,
    isSubmitting,
    errorsMessages,
  } = useForm({
    email: {
      defaultValue: 'leslief3@zplotsuu.com',
      errorsCondition: {
        min: 6,
        required: true,
      },
      errorMessage: 'Invalid email',
    },
    family_name: {
      defaultValue: 'firstName',
      errorsCondition: {
        min: 3,
        required: true,
      },
      errorMessage: 'Invalid firstName',
    },
    given_name: {
      defaultValue: 'lastname',
      errorsCondition: {
        min: 6,
        required: true,
      },
      errorMessage: 'Invalid lastname',
    },
    address: {
      defaultValue: 'address',
      errorsCondition: {
        min: 6,
        required: true,
      },
      errorMessage: 'Invalid address',
    },
    password: {
      defaultValue: '1111111111',
      errorsCondition: {
        min: 6,
        required: true,
      },
      errorMessage: 'Invalid password',
    },
    confirmPassword: {
      defaultValue: '1111111111',
      errorsCondition: {
        min: 6,
        required: true,
      },
      errorMessage: 'Password mismatch',
    },
  });
  const { show } = React.useContext(ToastContext);

  const { status, run } = useAsync();

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
      ({ message }: { message: string }) => {
        if (show) {
          show({ message });
        }
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
        label="confirmSignUp"
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
