/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from '@ui-kitten/components';
import { Auth } from 'aws-amplify';
import * as React from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import AppButton from '../../components/common/AppButton';
import AppContainer from '../../components/common/AppContainer';
import AppTextInput from '../../components/common/AppTextInput';
import { authFun, checkError } from '../../helpers/functions';
import { ParamList } from '../../navigation/ParamList';

type Props = {
  navigation: StackNavigationProp<ParamList, 'SignUp'>;
};

const SignUp: React.FC<Props> = ({ navigation }) => {
  const [isConfirmStep, setIsConfirmStep] = React.useState(true);
  const [email, setEmail] = React.useState('jiancehenj@mikes.cd');
  const [password, setPassword] = React.useState('1111111111');
  const [confirmPassword, setConfirmPassword] = React.useState('1111111111');
  const [verificationCode, setverificationCode] = React.useState('958338');

  const [loading, setLoading] = React.useState(false);

  async function signUp() {
    setLoading(true);
    console.log('loading', loading);
    authFun({
      func: Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
        },
      }),
      onSuccessFn: (res) => {
        setIsConfirmStep(true);
        console.log('res', res);
      },
      onFailedFn: (err) => {
        console.log('err', err);
      },
      callback: () => setLoading(false),
    });
  }

  async function confirmSignUp() {
    setLoading(true);
    console.log('loading', loading);

    authFun({
      func: Auth.confirmSignUp(email, verificationCode),
      onSuccessFn: (res) => {
        console.log('res', res);

        navigation.reset({
          index: 0,
          routes: [{ name: 'SignIn' }],
        });
      },
      onFailedFn: (err) => {
        console.log('err', err);
      },
      callback: () => setLoading(false),
    });
  }

  async function resendConfirmationCode() {
    authFun({
      func: Auth.resendSignUp(email),
      onSuccessFn: (res) => {
        console.log('okiii', res);
      },
      onFailedFn: (err) => {
        console.log('err', err);
      },
      callback: () => setLoading(false),
    });
  }
  const checkErrors = () =>
    checkError({ name: 'email', value: email }) &&
    checkError({ name: 'password', value: password }) &&
    password === confirmPassword;

  return (
    <AppContainer>
      <View style={[styles.subcontainer]}>
        <Text style={styles.title}>Sign Up</Text>
        {!isConfirmStep ? (
          <View>
            <AppTextInput
              value={email}
              onChangeText={(value) => setEmail(value)}
              leftIcon="person-outline"
              placeholder="Enter email"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
            />
            <AppTextInput
              value={password}
              onChangeText={(value) => setPassword(value)}
              leftIcon="lock-outline"
              placeholder="Enter password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              textContentType="password"
            />
            <AppTextInput
              value={confirmPassword}
              onChangeText={(value) => setConfirmPassword(value)}
              leftIcon="lock-outline"
              placeholder="Enter password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              textContentType="password"
            />
          </View>
        ) : (
          <AppTextInput
            value={verificationCode}
            onChangeText={(value) => setverificationCode(value)}
            leftIcon="lock-outline"
            placeholder="Enter verification code "
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
        )}
        <View style={styles.footerButtonContainer}>
          <AppButton
            loading={loading}
            title="Sign Up"
            onPress={() => (isConfirmStep ? confirmSignUp() : signUp())}
            disabled={!checkErrors()}
          />
          <AppButton
            loading={loading}
            title="Resend Code"
            onPress={resendConfirmationCode}
          />
        </View>
      </View>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  forgotPasswordButtonText: {
    color: 'tomato',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default SignUp;
