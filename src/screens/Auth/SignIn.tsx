/* eslint-disable @typescript-eslint/no-unused-vars */
import { StackNavigationProp } from '@react-navigation/stack';
import { Layout, Button, Text } from '@ui-kitten/components';
import { Auth } from 'aws-amplify';
import * as React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';

import AppButton from '../../components/common/AppButton';
import AppContainer from '../../components/common/AppContainer';
import AppTextInput from '../../components/common/AppTextInput';
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
  const [username, setUsername] = React.useState('jiancehenj@mikes.cd');
  const [password, setPassword] = React.useState('1111111111');
  const [loading, setLoading] = React.useState(false);

  console.log('navigationnavigation', navigation);

  async function signIn() {
    setLoading(true);
    authFun({
      func: Auth.signIn(username, password),
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
            value={username}
            onChangeText={(text) => setUsername(text)}
            leftIcon="person-outline"
            placeholder="Enter username"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <AppTextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            leftIcon="lock-outline"
            placeholder="Enter password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            textContentType="password"
          />
        </View>

        <Layout style={styles.footerButtonContainer}>
          <AppButton
            loading={loading}
            title="Login"
            onPress={signIn}
            disabled={username.length < 3 || password.length < 3}
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
