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

const ForgotPassword: React.FC<Props> = ({ navigation }) => {
  const [isConfirmStep, setIsConfirmStep] = React.useState(false);
  const [email, setEmail] = React.useState('jiancehenj@mikes.cd');
  const [password, setPassword] = React.useState('1111111112');
  const [confirmPassword, setConfirmPassword] = React.useState('1111111112');
  const [verificationCode, setverificationCode] = React.useState('818302');

  const [loading, setLoading] = React.useState(false);

  async function forgotPassword() {
    setLoading(true);
    console.log('loading', loading);
    authFun({
      func: Auth.forgotPassword(email),
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

  async function confirmForgotPassword() {
    setLoading(true);
    console.log('loading', loading);

    authFun({
      func: Auth.forgotPasswordSubmit(email, verificationCode, password),
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
  const checkErrors = () => {
    return !isConfirmStep
      ? checkError({ name: 'email', value: email })
      : checkError({ name: 'verificationCode', value: verificationCode }) &&
          checkError({ name: 'password', value: password }) &&
          password === confirmPassword;
  };

  return (
    <AppContainer>
      <View style={[styles.subcontainer]}>
        <Text style={styles.title}>Forgot Password </Text>
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
          </View>
        ) : (
          <View>
            <AppTextInput
              value={verificationCode}
              onChangeText={(value) => setverificationCode(value)}
              leftIcon="lock-outline"
              placeholder="Enter verification code "
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
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
        )}
        <View style={styles.footerButtonContainer}>
          <AppButton
            loading={loading}
            title="Validate"
            onPress={() =>
              !isConfirmStep ? forgotPassword() : confirmForgotPassword()
            }
            disabled={!checkErrors()}
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

export default ForgotPassword;
