// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StackNavigationProp } from '@react-navigation/stack';
import { Layout, Button, Text } from '@ui-kitten/components';
import { Auth } from 'aws-amplify';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { updateAuth } from '../../App';
import AppButton from '../components/common/AppButton';
import AppTextInput from '../components/common/AppTextInput';
import { authFun } from '../helpers/functions';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ParamList } from '../navigation/ParamList';

type Props = {
  navigation: StackNavigationProp<ParamList, 'SignIn'>;
  updateAuthState?: updateAuth;
};

const SignIn: React.FC<Props> = ({
  updateAuthState = () => {},
  navigation,
}) => {
  const [username, setUsername] = React.useState('jianchenj@chesles.com');
  const [password, setPassword] = React.useState('1111111111');
  const [loading, setLoading] = React.useState(false);

  async function signIn() {
    setLoading(true);
    authFun({
      func: Auth.signIn(username, password),
      onSuccessFn: (res) => {
        console.log('res', res);
      },
      onFailedFn: (err) => {
        console.log('err', err);
      },
      callback: () => setLoading(false),
    });
  }

  return (
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
      <AppButton
        loading={loading}
        title="Login"
        onPress={signIn}
        disabled={username.length < 3 || password.length < 3}
      />
      <Layout style={styles.footerButtonContainer}>
        <Button onPress={() => navigation.navigate('SignUp')}>
          Don't have an account? Sign Up
        </Button>
      </Layout>
    </Layout>
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
