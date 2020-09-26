import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Button, Text } from '@ui-kitten/components';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
// import { AuthNavigationProp, updateAuth } from '../../App';
import { updateAuth } from '../../App';

type Props = {
  //navigation: AuthNavigationProp;
  updateAuthState: updateAuth;
};

const SignIn: React.FC<Props> = ({ updateAuthState }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function signIn() {
    try {
      await Auth.signIn(username, password);
      console.log(
        '<img draggable="false" class="emoji" alt="✅" src="https://s.w.org/images/core/emoji/11/svg/2705.svg"> Success'
      );
      updateAuthState('loggedIn');
    } catch (error) {
      console.log(
        '<img draggable="false" class="emoji" alt="❌" src="https://s.w.org/images/core/emoji/11/svg/274c.svg"> Error signing in...',
        error
      );
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Layout style={styles.container}>
        <Text style={styles.title}>Sign in to your account</Text>
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
        <AppButton title="Login" onPress={signIn} />
        <Layout style={styles.footerButtonContainer}>
          <Button onPress={() => console.log('to do')}>
            Don't have an account? Sign Up
          </Button>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#202020',
    fontWeight: '500',
    marginVertical: 15,
  },
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPasswordButtonText: {
    color: 'tomato',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default SignIn;
