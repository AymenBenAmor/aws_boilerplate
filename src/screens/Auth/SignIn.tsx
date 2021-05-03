import { StackNavigationProp } from '@react-navigation/stack';
import { Auth } from 'aws-amplify';
import * as React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Text } from 'react-native';

import AppButton from 'components/common/AppButton';
import AppContainer from 'components/common/AppContainer';
import AppTextInput from 'components/common/AppTextInput';
import useForm from 'components/common/custemHook/useForm';

import { useAsync, PossibleActionType } from '../../helpers/customHooks';
import { updateAuth } from '../../navigation/AppNavigator';
import { ParamList } from '../../navigation/ParamList';
import { ToastContext } from '../../context/Toast/ToastContext';

type Props = {
  navigation: StackNavigationProp<ParamList, 'SignIn'>;
  updateAuthState: updateAuth;
};

const SignIn: React.FC<Props> = ({ updateAuthState, navigation }) => {
  const {
    handleChange,
    checkErrors,
    values,
    errorsMessages,
    isSubmitting,
  } = useForm({
    email: {
      defaultValue: 'ansiosid@holladayutah.com',
      errorsCondition: {
        max: 110,
        min: 16,
        required: true,
      },

      errorMessage: 'Invalid email',
    },
    password: {
      defaultValue: '1111111111',
      errorsCondition: {
        min: 6,
        required: true,
      },
      errorMessage: 'Invalid password',
    },
  });

  const { status, run } = useAsync();
  const { show } = React.useContext(ToastContext);

  const signIn = () => {
    run(Auth.signIn(values.email, values.password)).then(
      () => {
        updateAuthState('loggedIn');
      },
      ({ message }: { message: string }) => {
        if (show) {
          show({ message });
        }
      },
    );
  };

  return (
    <AppContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Sign in to your account</Text>
        <View>
          <AppTextInput
            value={values?.email || ''}
            onChangeText={value => handleChange({ name: 'email', value })}
            placeholder="Enter username"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            onBlur={() => checkErrors('email')}
            errorMessage={errorsMessages.email || ''}
          />
          <AppTextInput
            value={values?.password || ''}
            onChangeText={value => handleChange({ name: 'password', value })}
            placeholder="Enter password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            textContentType="password"
            onBlur={() => checkErrors('password')}
            errorMessage={errorsMessages.password || ''}
          />
        </View>

        <View style={styles.footerButtonContainer}>
          <AppButton
            loading={status === PossibleActionType.LOADING}
            label="Login"
            onPress={signIn}
            disabled={status === PossibleActionType.LOADING || isSubmitting}
          />
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={styles.forgotPassword}>Forgot Password ?</Text>
          </TouchableWithoutFeedback>
        </View>

        <AppButton
          onPress={() => navigation.navigate('SignUp')}
          label="Don't have an account? Sign Up"
        />
      </View>
    </AppContainer>
  );
};

export default SignIn;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    width: '100%',
  },
  title: {
    fontSize: 20,
    color: '#202020',
    fontWeight: '500',
    marginVertical: 15,
    textAlign: 'center',
  },
  forgotPassword: {
    fontSize: 12,
    color: 'blue',
    fontWeight: '500',
    textAlign: 'right',
    marginBottom: 15,
  },
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: 'center',
    width: '100%',
    textDecorationLine: 'underline',
    textDecorationColor: 'yellow',
    textShadowColor: 'red',
    textShadowRadius: 1,
  },
  forgotPasswordButtonText: {
    color: 'tomato',
    fontSize: 18,
    fontWeight: '600',
  },
});
