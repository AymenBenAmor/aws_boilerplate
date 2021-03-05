/* eslint-disable @typescript-eslint/no-unused-vars */
import { StackNavigationProp } from '@react-navigation/stack';
import { Layout, Button } from '@ui-kitten/components';
import { Auth } from 'aws-amplify';
import * as React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Text } from 'react-native';

import AppButton from '../../components/common/AppButton';
import AppContainer from '../../components/common/AppContainer';
import AppTextInput from '../../components/common/AppTextInput';
import useForm from '../../components/common/custemHook/useForm';
import { authFun } from '../../helpers/functions';
import { updateAuth } from '../../navigation/AppNavigator';
import { ParamList } from '../../navigation/ParamList';

type Props = {
  navigation: StackNavigationProp<ParamList, 'SignIn'>;
  updateAuthState?: updateAuth;
};

const SignIn: React.FC<Props> = ({
  updateAuthState = () => {},
  navigation,
}) => {
  const [loading, setLoading] = React.useState(false);

  const {
    handleChange,
    handleSubmit,
    checkErrors,
    values,
    isSubmitting,
    errorsMessages,
  } = useForm(
    {
      email: 'jiancehenj@shadesstreet.com',
      password: '1111111111',
    },
    { email: 'Invalid email', password: 'Invalid password' }
  );

  async function signIn() {
    setLoading(true);
    authFun({
      func: Auth.signIn(values.email, values.password),
      onSuccessFn: (res) => {
        console.log('res', res);
        updateAuthState('loggedIn');
      },
      onFailedFn: (err) => {
        console.log('err', err);
      },
      callback: () => setLoading(false),
    });
  }

  return (
    <AppContainer>
      <Layout style={styles.container}>
        <Text style={styles.title}>Sign in to your account</Text>
        <View>
          <AppTextInput
            value={values.email || ''}
            onChangeText={(value) => handleChange({ name: 'email', value })}
            leftIcon="person-outline"
            placeholder="Enter username"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            onBlur={() => checkErrors('email')}
            errorMessage={errorsMessages.email || ''}
          />
          <AppTextInput
            value={values.password || ''}
            onChangeText={(value) => handleChange({ name: 'password', value })}
            leftIcon="lock-outline"
            placeholder="Enter password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            textContentType="password"
            onBlur={() => checkErrors('password')}
            errorMessage={errorsMessages.password || ''}
          />
        </View>

        <Layout style={styles.footerButtonContainer}>
          <AppButton
            loading={loading}
            title="Login"
            onPress={signIn}
            disabled={isSubmitting}
          />
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={styles.forgotPassword}>Forgot Password ?</Text>
          </TouchableWithoutFeedback>
        </Layout>

        <Button onPress={() => navigation.navigate('SignUp')}>
          Don't have an account? Sign Up
        </Button>
      </Layout>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    color: '#202020',
    fontWeight: '500',
    marginVertical: 15,
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

export default SignIn;
